import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthenticateUserHandler } from './core/cqrs/handlers/authenticate-user.handler'
import { CreateUserHandler } from './core/cqrs/handlers/create-user.handler'
import { UserController } from './http/user.controller'
import { UserRepository } from './infra/user.repository'
import { UserSchema, UserSchemaFactory } from './infra/user.schema'

const queryHandlers = []
const commandHandlers = [CreateUserHandler, AuthenticateUserHandler]

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory }
    ])
  ],
  providers: [UserRepository, ...queryHandlers, ...commandHandlers],
  controllers: [UserController]
})
export class UserModule {}
