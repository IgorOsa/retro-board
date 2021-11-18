import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';

import { Board } from '../schemas/board.schema';

const MONGO_ENTITY_EXISTS_ERROR_CODE = 11000;

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_MODEL') private readonly boardModel: Model<Board>
  ) {}

  async findOne(payload = {}): Promise<Board | null> {
    const res = await this.boardModel.findOne(payload).exec();
    return res;
  }

  create(board: Board): Promise<Board> {
    try {
      return this.boardModel.create(board);
    } catch (err) {
      if (err.code === MONGO_ENTITY_EXISTS_ERROR_CODE) {
        throw new CustomBadRequestException('Board exists');
      }
      throw new CustomBadRequestException();
    }
  }
}
