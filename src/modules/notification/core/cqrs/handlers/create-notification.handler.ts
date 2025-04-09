import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NotificationRepository } from '@src/modules/notification/infra/notification.repository'
import { Notification } from '../../domain/notification'
import { CreateNotificationCommand } from '../command/create-notification.command'

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(command: CreateNotificationCommand): Promise<any> {
    const { userId, type, message } = command
    const notification = new Notification({
      message,
      type,
      userId,
      read: false
    })

    await this.notificationRepository.create(notification)
  }
}
