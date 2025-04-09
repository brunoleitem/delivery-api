import { HttpException, HttpStatus } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UserRepository } from '@src/modules/identity/infra/user.repository'
import { JwtService } from '@src/shared/module/auth/jwt.service'
import { AuthenticateUserCommand } from '../authenticate-user.command'

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserHandler
  implements ICommandHandler<AuthenticateUserCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async execute(
    command: AuthenticateUserCommand
  ): Promise<{ accessToken: string }> {
    const { password, email } = command
    const user = await this.userRepository.findByField('email', email)
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
    }

    const passwordValid = await user.comparePassword(password)
    if (!passwordValid) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST)
    }

    const { accessToken } = await this.jwtService.generateToken(user)
    return {
      accessToken
    }
  }
}
