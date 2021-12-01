import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomBadRequestException } from '../core/exceptions/badrequest.exception';
import { Auth, AuthResponse } from './auth.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: `User's login` })
  @ApiOkResponse({ description: 'Authenticated.', type: AuthResponse })
  @ApiBadRequestResponse({
    description: 'Bad request.',
    type: CustomBadRequestException,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiBody({ description: 'Login user', type: Auth })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
