import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';

const cookieName = 'gym_refresh_token';
const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/api/v1/auth', maxAge: 7 * 24 * 60 * 60 * 1000 };

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() body: { username?: string; password?: string }, @Res({ passthrough: true }) response: Response) {
    const result = this.auth.login(body.username ?? '', body.password ?? '');
    response.cookie(cookieName, result.refreshToken, cookieOptions);
    return { accessToken: result.accessToken };
  }

  @Post('register')
  register(@Body() body: { username?: string; password?: string }, @Res({ passthrough: true }) response: Response) {
    const result = this.auth.register(body.username ?? '', body.password ?? '');
    response.cookie(cookieName, result.refreshToken, cookieOptions);
    return { accessToken: result.accessToken };
  }

  @Post('refresh')
  refresh(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    const result = this.auth.refresh(request.cookies?.[cookieName]);
    response.cookie(cookieName, result.refreshToken, cookieOptions);
    return { accessToken: result.accessToken };
  }

  @Post('logout')
  logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    this.auth.logout(request.cookies?.[cookieName]);
    response.clearCookie(cookieName, { ...cookieOptions, maxAge: undefined });
    return { success: true };
  }
}
