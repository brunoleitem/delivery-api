import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './shared/module/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('port')
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
      whitelist: true
    })
  )

  await app.listen(port, () => {
    Logger.debug(`Server is running on http://localhost:${port}`)
  })
}
bootstrap()
