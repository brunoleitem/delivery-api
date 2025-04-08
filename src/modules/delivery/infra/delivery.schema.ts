import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { BaseSchemaOptions } from '@src/shared/core/persistence/base.schema'
import { HydratedDocument } from 'mongoose'
import { DeliveryStatus } from '../core/domain/value-objects'

type GeoPoint = {
  type: 'Point'
  coordinates: [number, number]
}

@Schema({ ...BaseSchemaOptions, collection: 'deliveries' })
export class DeliverySchema {
  @Prop({ required: true })
  customerId: string

  @Prop({ required: true })
  destinationAddress: string

  @Prop({
    required: true,
    type: Object,
    index: '2dsphere'
  })
  origin: GeoPoint

  @Prop({
    required: true,
    type: Object,
    index: '2dsphere'
  })
  destination: GeoPoint

  @Prop({ enum: DeliveryStatus, default: DeliveryStatus.Pending })
  status: DeliveryStatus

  @Prop()
  driverId?: string

  @Prop()
  packageInfo?: string
}

export type DeliveryDocument = HydratedDocument<DeliverySchema>
export const DeliverySchemaFactory =
  SchemaFactory.createForClass(DeliverySchema)
