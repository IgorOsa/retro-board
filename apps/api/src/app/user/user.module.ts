import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [DbModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
