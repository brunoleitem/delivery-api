import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NotificationRepository } from '@src/modules/notification/infra/notification.repository'
import { ReadNotificationCommand } from '../command/read-notification.command'

@CommandHandler(ReadNotificationCommand)
export class ReadNotificationHandler
  implements ICommandHandler<ReadNotificationCommand>
{
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async execute(command: ReadNotificationCommand): Promise<any> {
    const { id, userId } = command
    const notification = await this.notificationRepository.findBy({
      id,
      userId
    })

    if (!notification) {
      throw new Error('Notification not found')
    }

    notification.setRead(true)
    await this.notificationRepository.update(id, notification)
  }
}
