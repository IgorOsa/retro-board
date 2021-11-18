import { Controller, Get } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BoardService } from './board.service';
import { Board } from './schemas/board.schema';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: 'Get board' })
  @ApiOkResponse({
    description: `Board content.`,
    type: Board,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    // type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async findOne(): Promise<Board> {
    return this.boardService.findOne();
  }
}
