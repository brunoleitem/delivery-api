import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateDeliveryHandler } from './core/cqrs/handlers/create-delivery.handler'
import { ListDeliveryHandler } from './core/cqrs/handlers/list-delivery.handler'
import { DeliveryController } from './http/delivery.controller'
import { DeliveryRepository } from './infra/delivery.repository'
import { DeliverySchema, DeliverySchemaFactory } from './infra/delivery.schema'

const commandHandlers = [CreateDeliveryHandler]
const queryHandlers = [ListDeliveryHandler]
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DeliverySchema.name, schema: DeliverySchemaFactory }
    ])
  ],
  providers: [DeliveryRepository, ...commandHandlers, ...queryHandlers],
  controllers: [DeliveryController]
})
export class DeliveryModule {}
