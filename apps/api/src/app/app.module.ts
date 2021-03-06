import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, BoardModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
