import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => {
      const connection = await mongoose.connect(
        process.env.MONGO_CONNECTION_STRING
      );
      Logger.log(`Connected to MongoDB!`);

      return connection;
    },
  },
];
