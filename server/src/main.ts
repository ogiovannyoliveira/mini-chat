import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
// import { join } from 'path'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  // app.useStaticAssets(join(__dirname, '..', 'static', ''))
  await app.listen(process.env.APP_PORT || 3000)
}

bootstrap()
