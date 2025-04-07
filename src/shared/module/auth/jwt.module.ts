import { Module } from '@nestjs/common'
import type { JwtModuleOptions } from '@nestjs/jwt'
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt'
import { ConfigModule } from '../config/config.module'
import { ConfigService } from '../config/config.service'
import { JwtService } from './jwt.service'

@Module({})
export class JwtModule {
  static forRoot(options?: JwtModuleOptions) {
    return {
      module: JwtModule,
      global: true,
      providers: [JwtService],
      exports: [JwtService],
      imports: [
        NestJsJwtModule.registerAsync({
          imports: [ConfigModule.forRoot()],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('jwt_secret'),
            signOptions: { expiresIn: '7d' },
            global: true,
            ...options
          }),
          inject: [ConfigService]
        })
      ]
    }
  }
}
