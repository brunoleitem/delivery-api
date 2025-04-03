import { Module } from '@nestjs/common'
import { ConfigModule } from './shared/module/config/config-module'
import { MongooseModule } from './shared/module/persistence/mongoose-module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule,
  ]
})
export class AppModule {}
