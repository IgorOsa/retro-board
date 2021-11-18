import { Mongoose } from 'mongoose';
import { BoardSchema } from '../schemas/board.schema';

export const boardProviders = [
  {
    provide: 'BOARD_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Board', BoardSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
