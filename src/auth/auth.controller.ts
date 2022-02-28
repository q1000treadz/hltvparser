import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Post()
  login(): string {
    return this.appService.login();
  }
  @Post('/register')
  register(): string {
    return this.appService.register();
  }
}
