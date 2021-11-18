import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomBadRequestException } from '../core/exceptions/badrequest.exception';
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
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async findOne(): Promise<Board> {
    return await this.boardService.find();
  }

  @Post()
  @ApiOperation({ summary: 'Create board' })
  @ApiCreatedResponse({
    description: 'Board successfully created.',
    type: Board,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Create board', type: Board })
  async create(@Body() createBoard: Board): Promise<Board> {
    return this.boardService.create(createBoard);
  }
}
