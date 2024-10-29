import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { JwtMiddleware } from './components/services.ts/jwtMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [UsersModule,JwtModule,AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
