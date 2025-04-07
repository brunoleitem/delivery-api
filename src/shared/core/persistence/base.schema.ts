import { SchemaOptions } from '@nestjs/mongoose'

export const BaseSchemaOptions: SchemaOptions = {
  timestamps: true,
  virtuals: true,
  versionKey: false
}
