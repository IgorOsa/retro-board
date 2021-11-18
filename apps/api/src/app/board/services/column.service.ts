import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Board } from '../schemas/board.schema';
import { Column } from '../schemas/column.schema';

const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class ColumnService {
  constructor(
    @Inject('BOARD_MODEL') private readonly boardModel: Model<Board>
  ) {}

  async create(column: Column) {
    try {
      const res = await this.boardModel.updateOne(
        {},
        { $push: { columns: column } }
      );

      if (res.modifiedCount === 1) {
        return { message: 'Column successfully created.' };
      }
    } catch (err) {
      if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new CustomBadRequestException('Board exists');
      }
      throw new CustomBadRequestException();
    }
  }
}
