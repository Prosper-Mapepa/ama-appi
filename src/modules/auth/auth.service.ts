import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

export interface AuthPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await compare(password, user.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload: AuthPayload = { sub: user.id, email: user.email };
    const expiresIn = (this.configService.get<string>('JWT_EXPIRES_IN') ??
      '1d') as JwtSignOptions['expiresIn'];

    return {
      accessToken: await this.jwtService.signAsync(payload as object, {
        expiresIn,
      }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
