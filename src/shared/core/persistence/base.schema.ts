import { Prop, SchemaOptions } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export const BaseSchemaOptions: SchemaOptions = {
  timestamps: true,
  virtuals: true,
  versionKey: false
}

export class BaseSchema {

}
