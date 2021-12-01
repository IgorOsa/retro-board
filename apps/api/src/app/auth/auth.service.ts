import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponse, IJWTPayload } from '@retro-board/api-interfaces';
import { User } from '../user/schemas/user.schema';
import { UserService } from '../user/user.service';

import { checkHashedPassword } from './auth.helpers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ email });

    const isValidated = await checkHashedPassword(password, user.password);

    if (isValidated) {
      return user.toResponse();
    }

    return null;
  }

  async login(user: User): Promise<IAuthResponse> {
    const payload: IJWTPayload = { username: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
