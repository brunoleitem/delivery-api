import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HotelSchema } from "./infra/hotel.schema";
import { HotelController } from "./http/hotel.controller";
import { ListHotelHandler } from "./core/cqrs/handlers/list-hotel.handler";
import { CreateHotelHandler } from "./core/cqrs/handlers/create-hotel.handler";
import { HotelRepository } from "./infra/hotel.repository";

const queryHandlers = [ListHotelHandler]
const commandHandlers = [CreateHotelHandler]

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Hotel', schema: HotelSchema }
    ])
  ],
  providers: [HotelRepository, ...queryHandlers, ...commandHandlers] ,
  controllers: [HotelController]
})
export class HotelModule {}