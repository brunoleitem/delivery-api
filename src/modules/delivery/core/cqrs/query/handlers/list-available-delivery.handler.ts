import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeliveryRepository } from '@src/modules/delivery/infra/delivery.repository'
import { IPaginateResponse } from '@src/shared/core/persistence/persistence.dto'
import { Delivery } from '../../../domain/delivery'
import { DeliveryStatus } from '../../../domain/value-objects'
import { ListAvailableDeliveryQuery } from '../list-available-delivery.query'

@QueryHandler(ListAvailableDeliveryQuery)
export class ListAvailableDeliveryHandler
  implements IQueryHandler<ListAvailableDeliveryQuery>
{
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  async execute(
    query: ListAvailableDeliveryQuery
  ): Promise<IPaginateResponse<Delivery>> {
    const { limit, page } = query

    return await this.deliveryRepository.paginate({
      limit,
      page,
      filter: {
        status: DeliveryStatus.Pending
      }
    })
  }
}
