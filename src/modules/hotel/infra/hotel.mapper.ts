import { Types } from 'mongoose'
import { HotelDomain } from '../core/domain/Hotel'
import { Hotel, HotelDocument } from './hotel.schema'

export class HotelMapper {
  static toDomain(hotel: HotelDocument): HotelDomain {
    return new HotelDomain(
      {
        name: hotel.name,
        address: hotel.address
      },
      hotel.id
    )
  }

  static toPersistence(hotel: HotelDomain): Partial<Hotel> {
    return {
      name: hotel.getName(),
      address: hotel.getAddress()
    }
  }
}
