import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchemaOptions } from '@src/shared/core/persistence/base.schema'
import { HydratedDocument } from 'mongoose'
import { NotificationType } from '../core/domain/value-objects'

@Schema({ ...BaseSchemaOptions, collection: 'notifications' })
export class NotificationSchema {
  @Prop({ required: true })
  userId: string

  @Prop({ required: true })
  message: string

  @Prop({ enum: NotificationType, required: true })
  type: NotificationType

  @Prop({ required: true })
  read: boolean
}

export type NotificationDocument = HydratedDocument<NotificationSchema>
export const NotificationSchemaFactory =
  SchemaFactory.createForClass(NotificationSchema)
