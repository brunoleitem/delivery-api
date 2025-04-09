import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BaseRepository } from '@src/shared/core/persistence/base.repository'
import { Model } from 'mongoose'
import { Notification } from '../core/domain/notification'
import { NotificationDocument, NotificationSchema } from './notification.schema'

@Injectable()
export class NotificationRepository extends BaseRepository<
  NotificationDocument,
  Notification
> {
  constructor(
    @InjectModel(NotificationSchema.name)
    private readonly notificationModel: Model<NotificationDocument>
  ) {
    super(notificationModel)
  }

  protected mapToEntity(model: NotificationDocument): Notification {
    return new Notification(
      {
        type: model.type,
        message: model.message,
        userId: model.userId,
        read: model.read
      },
      model.id
    )
  }

  protected mapToSchema(entity: Notification): any {
    return {
      type: entity.getType(),
      message: entity.getMessage(),
      userId: entity.getUserId(),
      read: entity.getRead()
    }
  }
}
