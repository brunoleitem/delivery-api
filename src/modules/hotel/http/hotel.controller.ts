import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post
} from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateHotelCommand } from '../core/command/create-hotel.command'
import { ListHotelQuery } from '../core/query/list-hotel.query'
import { HotelRequest } from './hotel-request.namespace'

@Controller('hotel')
export class HotelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createHotel(@Body() body: HotelRequest.CreateHotelBody) {
    return await this.commandBus.execute(new CreateHotelCommand(body.name, body.address))
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listHotel() {
    return await this.queryBus.execute(new ListHotelQuery())
  }
}
