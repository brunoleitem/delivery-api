import {
  type ExecutionContext,
  UnauthorizedException,
  createParamDecorator
} from '@nestjs/common'
import type { Request } from 'express'
export const JwtPayload = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user
    if (!user.id) {
      throw new UnauthorizedException('Unauthorized')
    }
    return user
  }
)
