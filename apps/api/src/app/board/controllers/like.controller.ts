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
import { Like } from '../schemas/like.schema';
import { LikeService } from '../services/like.service';

@ApiTags('like')
@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add like' })
  @ApiCreatedResponse({
    description: 'Like successfully added.',
    type: Like,
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Add like', type: Like })
  async addLike(@Body() like: Like) {
    const created = await this.likeService.create(like);
    return created;
  }

  @Post('remove')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remove like' })
  @ApiOkResponse({
    description: 'Like successfully removed.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Remove like', type: Like })
  async remove(@Body() like: Like) {
    return await this.likeService.remove(like);
  }
}
