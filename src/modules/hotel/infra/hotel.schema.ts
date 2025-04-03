import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseSchema } from "@src/shared/core/persistence/base.schema";
import { HydratedDocument } from "mongoose";

@Schema()
export class Hotel extends BaseSchema {
  name: string;
}
export type HotelDocument = HydratedDocument<Hotel>;
export const HotelSchema = SchemaFactory.createForClass(Hotel);