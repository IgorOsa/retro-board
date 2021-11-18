import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { BoardController } from './board.controller';
import { boardProviders } from './board.providers';
import { BoardService } from './board.service';

@Module({
  imports: [DbModule],
  exports: [BoardModule],
  controllers: [BoardController],
  providers: [BoardService, ...boardProviders],
})
export class BoardModule {}
