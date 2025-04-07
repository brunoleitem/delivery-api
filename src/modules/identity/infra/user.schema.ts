import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchemaOptions } from '@src/shared/core/persistence/base.schema'
import { HydratedDocument } from 'mongoose'

@Schema({ ...BaseSchemaOptions, collection: 'users' })
export class UserSchema {
  @Prop({ required: true, unique: true })
  email: string
  @Prop({ required: true })
  password: string
  @Prop({ required: true })
  name: string
  @Prop({ default: false })
  isDriver: boolean
}

export type UserDocument = HydratedDocument<UserSchema>
export const UserSchemaFactory = SchemaFactory.createForClass(UserSchema)
