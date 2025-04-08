import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { AuthenticateUserCommand } from '../core/cqrs/command/authenticate-user.command'
import { CreateUserCommand } from '../core/cqrs/command/create-user.command'
import { UserRequest } from './user-request.namespace'

@Controller('/api/user')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: UserRequest.CreateUserBody) {
    return await this.commandBus.execute(
      new CreateUserCommand(body.name, body.email, body.password, body.isDriver)
    )
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: UserRequest.LoginUserBody) {
    return await this.commandBus.execute(
      new AuthenticateUserCommand(body.email, body.password)
    )
  }
}
