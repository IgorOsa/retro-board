import { Module } from '@nestjs/common';
import { DbModule } from '../db/db.module';
import { BoardController } from './controllers/board.controller';
import { boardProviders } from './providers/board.providers';
import { BoardService } from './services/board.service';
import { ColumnController } from './controllers/column.controller';
import { ColumnService } from './services/column.service';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { LikeService } from './services/like.service';
import { LikeController } from './controllers/like.controller ';

@Module({
  imports: [DbModule],
  exports: [BoardModule],
  controllers: [
    BoardController,
    ColumnController,
    TaskController,
    LikeController,
  ],
  providers: [
    BoardService,
    ...boardProviders,
    ColumnService,
    TaskService,
    LikeService,
  ],
})
export class BoardModule {}
