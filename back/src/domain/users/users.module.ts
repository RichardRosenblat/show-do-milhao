import { Module } from '@nestjs/common';
import { UsersCommand } from './command/users.command';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersCommand,],
})
export class UsersModule {}
