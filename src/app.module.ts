import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { DeliveryModule } from './modules/delivery/delivery.module'
import { UserModule } from './modules/identity/user.module'
import { JwtModule } from './shared/module/auth/jwt.module'
import { ConfigModule } from './shared/module/config/config.module'
import { MongooseModule } from './shared/module/persistence/mongoose.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    JwtModule.forRoot(),
    MongooseModule,

    UserModule,
    DeliveryModule
  ]
})
export class AppModule {}
