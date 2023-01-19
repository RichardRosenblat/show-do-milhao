import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { UsersCommand } from 'src/domain/users/command/users.command';
import { userDataDTO } from '../dto/userData.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersCommand: UsersCommand,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersCommand.findByEmail(email);

    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: userDataDTO) {
    const payload = { email: user.email, sub: user._id };

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
