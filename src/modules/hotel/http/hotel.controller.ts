import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

@Controller('hotel')
export class HotelController {
  constructor() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHotel() {}
}