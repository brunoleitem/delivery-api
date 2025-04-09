import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeliveryRepository } from '@src/modules/delivery/infra/delivery.repository'
import { IdentityIntegrationApi } from '@src/shared/integration/identity/identity-integration.interface'
import { AcceptDeliveryCommand } from '../accept-delivery.command'

@CommandHandler(AcceptDeliveryCommand)
export class AcceptDeliveryHandler
  implements ICommandHandler<AcceptDeliveryCommand>
{
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    @Inject(IdentityIntegrationApi)
    private readonly identityIntegration: IdentityIntegrationApi
  ) {}

  async execute(command: AcceptDeliveryCommand): Promise<any> {
    const { deliveryId, userId } = command
    const delivery = await this.deliveryRepository.findById(deliveryId)
    if (!delivery) {
      throw new Error('Delivery not found')
    }

    const driver = await this.identityIntegration.isDriver(userId)
    if (!driver) {
      throw new Error('User is not a driver')
    }

    delivery.acceptDelivery(userId)
    await this.deliveryRepository.update(deliveryId, delivery)
  }
}
