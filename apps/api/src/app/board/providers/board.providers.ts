import { Mongoose } from 'mongoose';
import { BoardSchema } from '../schemas/board.schema';
import { ColumnSchema } from '../schemas/column.schema';
import { LikeSchema } from '../schemas/like.schema';
import { TaskSchema } from '../schemas/task.schema';

export const boardProviders = [
  {
    provide: 'BOARD_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Board', BoardSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'COLUMN_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Column', ColumnSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'TASK_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Task', TaskSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'LIKE_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Like', LikeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
