import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  BaseSchema,
  BaseSchemaOptions
} from '@src/shared/core/persistence/base.schema'
import { HydratedDocument } from 'mongoose'

@Schema(BaseSchemaOptions)
export class Hotel extends BaseSchema {
  @Prop()
  name: string
  @Prop()
  address: string
}
export type HotelDocument = HydratedDocument<Hotel>
export const HotelSchema = SchemaFactory.createForClass(Hotel)
