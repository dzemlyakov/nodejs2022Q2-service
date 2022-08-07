import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignupAuthDto } from './dto/signup-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(signupAuthDto: SignupAuthDto) {
    return await this.userService.create(signupAuthDto);
  }

  async login(loginAuthDto: LoginAuthDto) {
    const users = await this.userService.findAll();
    const user = users.find((user) => user.login === loginAuthDto.login);
    if (!user) throw new ForbiddenException();

    const { id, login } = user;
    const accessToken = await this.jwtService.signAsync(
      { userId: id, login },
      {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      },
    );

    return { accessToken };
  }
}
