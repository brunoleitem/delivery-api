import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs'
import { DeliveryRepository } from '@src/modules/delivery/infra/delivery.repository'
import { DeliveryCreatedEvent } from '@src/shared/domain/events/delivery/delivery-created.event'
import { Delivery } from '../../domain/delivery'
import { Coordinates, DeliveryStatus } from '../../domain/value-objects'
import { CreateDeliveryCommand } from '../command/create-delivery.command'

@CommandHandler(CreateDeliveryCommand)
export class CreateDeliveryHandler
  implements ICommandHandler<CreateDeliveryCommand>
{
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly eventBus: EventBus
  ) {}

  async execute(command: CreateDeliveryCommand): Promise<void> {
    const { customerId, destination, destinationAddress, origin, packageInfo } =
      command
    const originCoords = new Coordinates(origin.lat, origin.lng)
    const destinationCoords = new Coordinates(destination.lat, destination.lng)
    const delivery = new Delivery({
      origin: originCoords,
      destination: destinationCoords,
      destinationAddress,
      customerId,
      packageInfo,
      status: DeliveryStatus.Pending
    })
    await this.deliveryRepository.create(delivery)
    this.eventBus.publish(new DeliveryCreatedEvent(customerId))
  }
}
