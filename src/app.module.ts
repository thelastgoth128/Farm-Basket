import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './components/users/users.module';
import { JwtMiddleware } from './components/services.ts/jwtMiddleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './components/auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ProductsModule } from './components/products/products.module';

@Module({
  imports: [UsersModule,JwtModule,AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(JwtMiddleware).forRoutes('*')
  }
}
