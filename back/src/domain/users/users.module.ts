import { Module } from '@nestjs/common';
import { UsersCommand } from './command/users.command';
import { UsersController } from './controller/users.controller';
import { UsersRepository } from './repository/users.repository';
import { doesUserEmailExists } from './validators/doesUserEmailAlreadyExist';

@Module({
  controllers: [UsersController],
  providers: [UsersRepository, UsersCommand, doesUserEmailExists],
})
export class UsersModule {}
