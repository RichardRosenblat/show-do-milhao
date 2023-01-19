import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersCommand } from 'src/domain/users/command/users.command';
import { UserDTO } from 'src/domain/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersCommand: UsersCommand,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    let user: UserDTO = null;

    try {
      user = await this.usersCommand.findByEmail(email);
    } catch {}

    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
