import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DeliveryModule } from './modules/delivery/delivery.module'
import { IdentityModule } from './modules/identity/identity.module'
import { NotificationModule } from './modules/notification/notification.module'
import { JwtModule } from './shared/module/auth/jwt.module'
import { ConfigModule } from './shared/module/config/config.module'
import { MongooseModule } from './shared/module/persistence/mongoose.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    JwtModule.forRoot(),
    MongooseModule,

    IdentityModule,
    DeliveryModule,
    NotificationModule
  ]
})
export class AppModule {}
