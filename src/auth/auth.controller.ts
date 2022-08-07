import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup() {
    return this.authService.signup;
  }
  @Post('login')
  @HttpCode(201)
  login() {
    return this.authService.login;
  }
  @Post('refresh')
  @HttpCode(201)
  refresh() {
    return this.authService.refresh;
  }
}
