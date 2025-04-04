import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {
  BaseSchema,
  BaseSchemaOptions
} from '@src/shared/core/persistence/base.schema'
import { HydratedDocument } from 'mongoose'

@Schema({...BaseSchemaOptions, collection: 'hotel'})
export class Hotel extends BaseSchema {
  @Prop({ required: true })
  name: string
  @Prop({ required: true })
  address: string
}
export type HotelDocument = HydratedDocument<Hotel>
export const HotelSchema = SchemaFactory.createForClass(Hotel)
