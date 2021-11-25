import { ApiProperty } from '@nestjs/swagger';
import { IAuthResponse } from '@retro-board/api-interfaces';

export class Auth {
  @ApiProperty({
    example: 'john@example.com',
    description: `User's email`,
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: `User's password`,
  })
  password: string;
}

export class AuthResponse implements IAuthResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImppbmFAZXhhbXBsZS5jb20iLCJzdWIiOiI2MThkMzFmZDE2ZDYxNTI5OWIwYzBjOGIiLCJpYXQiOjE2MzY2NTY5MDEsImV4cCI6MTYzNjc0MzMwMX0._lpOkvm9Tk7887tfrhycNDIavVq-MP1EuohoaIhDS0s',
    description: `Access JWT Token`,
  })
  access_token: string;
}
