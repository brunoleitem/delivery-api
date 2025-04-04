import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { HotelRepository } from '../../infra/hotel.repository'
import { Hotel } from '../../infra/hotel.schema'
import { ListHotelQuery } from '../query/list-hotel.query'
import { HotelMapper } from '../../infra/hotel.mapper'
import { HotelDomain } from '../domain/Hotel'

@QueryHandler(ListHotelQuery)
export class ListHotelHandler implements IQueryHandler<ListHotelQuery> {
  constructor(private readonly hotelRepository: HotelRepository) {}
  async execute(): Promise<HotelDomain[]> {
    const domainList = []
    const hotelList = await this.hotelRepository.findAll()
    hotelList.map((hotel) => {
      const hotelDomain = HotelMapper.toDomain(hotel)
      domainList.push(hotelDomain.toJSON())
    }
    )
    return domainList
  }
}
