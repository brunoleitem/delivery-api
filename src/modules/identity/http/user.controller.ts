import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { JwtPayload } from '@src/shared/http/decorators/jwt-payload.decorator'
import { AuthGuard } from '@src/shared/http/guards/auth.guard'
import { IJwtPayload } from '@src/shared/http/interfaces/jwt-payload.interface'
import { AuthenticateUserCommand } from '../core/cqrs/command/authenticate-user.command'
import { CreateUserCommand } from '../core/cqrs/command/create-user.command'
import { ListUserQuery } from '../core/cqrs/query/list-hotel.query'
import { UserRequest } from './user-request.namespace'

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

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

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async listUsers(@JwtPayload() payload: IJwtPayload) {
    return await this.queryBus.execute(new ListUserQuery())
  }
}
