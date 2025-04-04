import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { HotelRepository } from '../../infra/hotel.repository'
import { CreateHotelCommand } from '../command/create-hotel.command'

@CommandHandler(CreateHotelCommand)
export class CreateHotelHandler implements ICommandHandler<CreateHotelCommand> {
  constructor(private readonly hotelRepository: HotelRepository) {}

  async execute(command: CreateHotelCommand): Promise<void> {
    const { name, address} = command
    await this.hotelRepository.create({ name, address })
  }
}
