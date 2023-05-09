import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpdto } from './dto/sign-up.dto';
import { LocalGuard, RefreshJwtGuard } from './guards';
import { AuthResponse, Token, UserID } from 'src/common/decorators';
import { Auth } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignUpdto): Promise<Auth> {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalGuard)
  @Post('signin')
  signIn(@AuthResponse() tokens): Promise<Auth> {
    return tokens;
  }

  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  refresh(@UserID() userId, @Token() token): Promise<Auth> {
    return this.authService.refreshTokens({ userId, token });
  }
}
