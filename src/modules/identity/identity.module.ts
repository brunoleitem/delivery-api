import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthenticateUserHandler } from './core/cqrs/command/handlers/authenticate-user.handler'
import { CreateUserHandler } from './core/cqrs/command/handlers/create-user.handler'
import { GetUserDriverHandler } from './core/cqrs/query/handlers/get-user.handler'
import { UserController } from './http/user.controller'
import { UserRepository } from './infra/user.repository'
import { UserSchema, UserSchemaFactory } from './infra/user.schema'
import { IdentityIntegrationProvider } from './integration/provider/identity-integration.provider'

const queryHandlers = [GetUserDriverHandler]
const commandHandlers = [CreateUserHandler, AuthenticateUserHandler]

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserSchemaFactory }
    ])
  ],
  providers: [
    UserRepository,
    ...queryHandlers,
    ...commandHandlers,
    IdentityIntegrationProvider
  ],
  controllers: [UserController],
  exports: [IdentityIntegrationProvider]
})
export class IdentityModule {}
