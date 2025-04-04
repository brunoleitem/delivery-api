import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HotelRepository } from '../../infra/hotel.repository'
import { Hotel } from '../../infra/hotel.schema'
import { ListHotelQuery } from '../query/list-hotel.query'

@QueryHandler(ListHotelQuery)
export class ListHotelHandler implements IQueryHandler<ListHotelQuery> {
  constructor(private readonly hotelRepository: HotelRepository) {}
  async execute(): Promise<Hotel[]> {
    return await this.hotelRepository.findAll()
  }
}
