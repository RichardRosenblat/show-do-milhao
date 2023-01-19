import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';
import { Response } from 'express';
import { userDataDTO } from '../dto/userData.dto';

@Controller('/login')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req: Response & { user: userDataDTO }) {
    return this.authService.login(req.user);
  }
}
