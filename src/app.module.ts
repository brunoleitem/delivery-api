import { Module } from '@nestjs/common'
import { ConfigModule } from './shared/module/config/config-module'
import { MongooseModule } from './shared/module/persistence/mongoose-module'
import { CqrsModule } from '@nestjs/cqrs'
import { HotelModule } from './modules/hotel/hotel.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule,
    CqrsModule.forRoot(),
    HotelModule
  ]
})
export class AppModule {}
