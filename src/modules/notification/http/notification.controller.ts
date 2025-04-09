import { Controller, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { JwtPayload } from '@src/shared/http/decorators/jwt-payload.decorator'
import { IJwtPayload } from '@src/shared/http/interfaces/jwt-payload.interface'
import { ReadNotificationCommand } from '../core/cqrs/command/read-notification.command'

@Controller('api/notification')
export class NotificationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':id/read')
  @HttpCode(HttpStatus.OK)
  async readNotification(
    @Param('id') id: string,
    @JwtPayload() payload: IJwtPayload
  ) {
    await this.commandBus.execute(new ReadNotificationCommand(id, payload.id))
  }
}
