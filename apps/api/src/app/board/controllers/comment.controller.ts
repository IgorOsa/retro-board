import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CustomBadRequestException } from '../../core/exceptions/badrequest.exception';
import { Comment } from '../schemas/comment.schema';
import { CommentService } from '../services/comment.service';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add comment' })
  @ApiCreatedResponse({
    description: 'Comment successfully added.',
    type: Comment,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Add comment', type: Comment })
  async addLike(@Body() comment: Comment) {
    const created = await this.commentService.create(comment);
    return created;
  }

  @Post('remove')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove comment' })
  @ApiOkResponse({
    description: 'Comment successfully removed.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Remove comment', type: Comment })
  async remove(@Body() comment: Comment) {
    return await this.commentService.remove(comment);
  }
}
