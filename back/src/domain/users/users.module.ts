import { Module } from '@nestjs/common';
import { UsersCommand } from './command/users.command';
import { UsersActionsController } from './controller/usersActions.controller';
import { UsersRepository } from './repository/users.repository';
import { doesUserEmailExists } from './validator/doesUserEmailAlreadyExist';
import { UsersCRUDController } from './controller/usersCRUD.controller';

@Module({
  controllers: [UsersActionsController, UsersCRUDController],
  providers: [UsersRepository, UsersCommand, doesUserEmailExists],
})
export class UsersModule {}
