import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IdentityIntegrationApi } from '@src/shared/integration/identity/identity-integration.interface'
import { IdentityModule } from '../identity/identity.module'
import { IdentityIntegrationProvider } from '../identity/integration/provider/identity-integration.provider'
import { AcceptDeliveryHandler } from './core/cqrs/command/handlers/accept-delivery.handler'
import { CreateDeliveryHandler } from './core/cqrs/command/handlers/create-delivery.handler'
import { ListAvailableDeliveryHandler } from './core/cqrs/query/handlers/list-available-delivery.handler'
import { ListDeliveryHandler } from './core/cqrs/query/handlers/list-delivery.handler'
import { DeliveryController } from './http/delivery.controller'
import { DeliveryRepository } from './infra/delivery.repository'
import { DeliverySchema, DeliverySchemaFactory } from './infra/delivery.schema'

const commandHandlers = [CreateDeliveryHandler, AcceptDeliveryHandler]
const queryHandlers = [ListDeliveryHandler, ListAvailableDeliveryHandler]
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliverySchema.name, schema: DeliverySchemaFactory }
    ]),
    IdentityModule
  ],
  providers: [
    DeliveryRepository,
    ...commandHandlers,
    ...queryHandlers,
    {
      provide: IdentityIntegrationApi,
      useExisting: IdentityIntegrationProvider
    }
  ],
  controllers: [DeliveryController]
})
export class DeliveryModule {}
