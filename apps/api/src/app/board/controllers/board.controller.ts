import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { BoardService } from '../services/board.service';
import {
  Board,
  BoardCreateRequest,
  BoardCreateResponse,
} from '../schemas/board.schema';
import { IMessage } from '@retro-board/api-interfaces';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

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
  async findOne(): Promise<Board | IMessage> {
    const b = await this.boardService.findOne();
    return b || { message: 'No boards' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create board' })
  @ApiCreatedResponse({
    description: 'Board successfully created.',
    type: BoardCreateResponse,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Create board', type: BoardCreateRequest })
  async create(@Body() board: Board): Promise<Board> {
    const b = this.boardService.create(board);
    return b;
  }
}
