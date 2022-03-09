import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // 원인이 무엇인지 에러로 출력해러
    transform: true, // 자동으로 형변환해줌 -> 예를 들면 id를 string에서 number로 바꿔줌.
  }));

  await app.listen(4000);
}
bootstrap();
