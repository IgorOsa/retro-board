import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove comment by id.' })
  @ApiOkResponse({ description: 'Comment removed successfully.' })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async remove(@Param('id') id: string) {
    return await this.commentService.remove(id);
  }
}
