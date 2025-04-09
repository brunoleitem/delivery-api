import { NotificationType } from '../../domain/value-objects'

export class CreateNotificationCommand {
  constructor(
    public readonly userId: string,
    public readonly message: string,
    public readonly type: NotificationType
  ) {}
}
