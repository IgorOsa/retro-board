import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { BoardController } from './controllers/board.controller';
import { boardProviders } from './providers/board.providers';
import { BoardService } from './services/board.service';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';

@Module({
  imports: [DbModule],
  exports: [BoardModule],
  controllers: [BoardController, ColumnController],
  providers: [BoardService, ...boardProviders, ColumnService],
})
export class BoardModule {}
