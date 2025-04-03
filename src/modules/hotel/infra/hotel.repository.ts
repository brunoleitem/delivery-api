import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@src/shared/core/persistence/base.repository";
import { Hotel } from "./hotel.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class HotelRepository extends BaseRepository<Hotel> {
  constructor(
    @InjectModel('Hotel')
    private readonly hotelModel: Model<Hotel>
  ) {
    super(hotelModel);
  }
}