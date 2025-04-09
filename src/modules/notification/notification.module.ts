import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateNotificationHandler } from './core/cqrs/handlers/create-notification.handler'
import { ReadNotificationHandler } from './core/cqrs/handlers/read-notification.handler'
import { DeliveryCreatedEventHandler } from './core/events/delivery-created-event.handler'
import { NotificationController } from './http/notification.controller'
import { NotificationRepository } from './infra/notification.repository'
import {
  NotificationSchema,
  NotificationSchemaFactory
} from './infra/notification.schema'

const commandHandlers = [CreateNotificationHandler, ReadNotificationHandler]
const eventsHandlers = [DeliveryCreatedEventHandler]

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NotificationSchema.name, schema: NotificationSchemaFactory }
    ])
  ],
  providers: [NotificationRepository, ...commandHandlers, ...eventsHandlers],
  controllers: [NotificationController]
})
export class NotificationModule {}
