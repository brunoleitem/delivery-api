import { Type } from 'class-transformer'
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'

export namespace DeliveryNamespace {
  class LatLng {
    @IsNumber()
    lat: number
    @IsNumber()
    lng: number
  }

  export class CreateBody {
    @ValidateNested()
    @Type(() => LatLng)
    origin: LatLng

    @ValidateNested()
    @Type(() => LatLng)
    destination: LatLng

    @IsString()
    destinationAddress: string

    @IsString()
    @IsOptional()
    packageInfo?: string
  }
}
