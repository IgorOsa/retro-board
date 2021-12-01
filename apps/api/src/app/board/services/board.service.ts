import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';

import { Board, BoardDocument } from '../schemas/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_MODEL') private readonly boardModel: Model<BoardDocument>
  ) {}

  async findOne(payload = {}): Promise<Board | null> {
    try {
      const res = await this.boardModel.findOne(payload).exec();
      if (!res) {
        throw new CustomBadRequestException(`No board found`);
      }
      return res;
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }

  create(board: Board): Promise<Board> {
    try {
      return this.boardModel.create(board);
    } catch (err) {
      throw new CustomBadRequestException(err.message);
    }
  }
}
