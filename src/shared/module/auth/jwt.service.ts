import { type ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService as NestJsJwtService } from '@nestjs/jwt'
import { User } from '@src/modules/identity/core/domain/User'

@Injectable()
export class JwtService {
  constructor(private readonly nestJsJwtService: NestJsJwtService) {}
  async generateToken(user: User) {
    const payload = {
      user: {
        id: user.id,
        email: user.getEmail(),
        name: user.getName(),
        isDriver: user.getIsDriver()
      }
    }
    const accessToken = this.nestJsJwtService.sign(payload)
    return {
      accessToken
    }
  }

  async verify(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest()
    const token = this.extractFromHeader(request)
    if (!token) return false
    const payload = await this.nestJsJwtService.verify(token)
    request.user = payload.user
    return true
  }

  async verifyWs(ctx: ExecutionContext) {
    const client = ctx.switchToWs().getClient()
    const token = client.handshake.query.token as string
    if (!token) return false
    const payload = await this.nestJsJwtService.verify(token)
    client.user = payload.user
    return true
  }

  private extractFromHeader(request: Request) {
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new Error('Authorization header not found')
    }
    return authHeader.split(' ')[1]
  }
}
