import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs'
import { DeliveryCreatedEvent } from '@src/shared/domain/events/delivery/delivery-created.event'
import { CreateNotificationCommand } from '../cqrs/command/create-notification.command'
import { NotificationType } from '../domain/value-objects'

@EventsHandler(DeliveryCreatedEvent)
export class DeliveryCreatedEventHandler
  implements IEventHandler<DeliveryCreatedEvent>
{
  constructor(private readonly commandBus: CommandBus) {}

  async handle(event: DeliveryCreatedEvent) {
    await this.commandBus.execute(
      new CreateNotificationCommand(
        event.userId,
        'Sua entrega foi solicitada!',
        NotificationType.NEW_DELIVERY
      )
    )
  }
}
