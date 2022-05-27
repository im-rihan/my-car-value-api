import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './authservice/auth.service';
import { UsersController } from './controller/users.controller';
import { UserEntity } from './entity/user.entity';
import { UsersService } from './service/users.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService,],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
