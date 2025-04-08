import { Logger } from '@nestjs/common'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

export class DeliveryCreatedEvent {
  constructor(
    public readonly deliveryId: string,
    public readonly userId: string
  ) {}
}

@EventsHandler(DeliveryCreatedEvent)
export class DeliveryCreatedEventHandler
  implements IEventHandler<DeliveryCreatedEvent>
{
  constructor() {}

  handle(event: DeliveryCreatedEvent) {
    Logger.log(
      `DeliveryCreatedEvent: ${event.deliveryId} for user ${event.userId}`,
      DeliveryCreatedEventHandler.name
    )
  }
}
