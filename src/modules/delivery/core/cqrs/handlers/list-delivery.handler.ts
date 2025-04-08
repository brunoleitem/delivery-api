import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { DeliveryRepository } from '@src/modules/delivery/infra/delivery.repository'
import { IPaginateResponse } from '@src/shared/core/persistence/persistence.dto'
import { Delivery } from '../../domain/delivery'
import { ListDeliveryQuery } from '../query/list-delivery.query'

@QueryHandler(ListDeliveryQuery)
export class ListDeliveryHandler implements IQueryHandler<ListDeliveryQuery> {
  constructor(private readonly deliveryRepository: DeliveryRepository) {}
  async execute(
    query: ListDeliveryQuery
  ): Promise<IPaginateResponse<Delivery>> {
    const { limit, page } = query

    return await this.deliveryRepository.paginate({
      limit,
      page,
      filter: {
        customerId: query.customerId
      }
    })
  }
}
