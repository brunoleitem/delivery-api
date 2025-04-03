import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelSchema } from "./infra/hotel.schema";
import { HotelController } from "./http/hotel.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hotel', schema: HotelSchema }
    ])
  ],
  controllers: [HotelController]
})
export class HotelModule {}