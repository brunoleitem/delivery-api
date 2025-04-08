import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@src/shared/module/auth/jwt.service'

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(ctx: ExecutionContext) {
    try {
      await this.jwtService.verifyWs(ctx)
      return true
    } catch (e) {
      Logger.error(e.message)
      throw new UnauthorizedException('Token inválido')
    }
  }
}
