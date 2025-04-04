import { IsString } from 'class-validator'
export namespace HotelRequest {
  export class CreateHotelBody {
    @IsString()
    name: string
    @IsString()
    address: string
  }
}
