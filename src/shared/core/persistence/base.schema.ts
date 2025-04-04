import { Prop, SchemaOptions } from '@nestjs/mongoose'

export const BaseSchemaOptions: SchemaOptions = {
  timestamps: true,
  virtuals: true,
  versionKey: false
}

export class BaseSchema {
  @Prop({ type: String, alias: 'id' })
  _id?: string
}
