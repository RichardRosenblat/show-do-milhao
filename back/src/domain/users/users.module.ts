import { Module, forwardRef } from '@nestjs/common';
import { UsersCommand } from './command/users.command';
import { UsersControlsController } from './controller/usersControls.controller';
import { UsersRepository } from './repository/users.repository';
import { doesUserEmailExists } from './validator/doesUserEmailAlreadyExist';
import { UsersCRUDController } from './controller/usersCRUD.controller';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  controllers: [UsersControlsController, UsersCRUDController],
  providers: [UsersRepository, UsersCommand, doesUserEmailExists],
  imports: [forwardRef(() => QuestionsModule)],
  exports: [UsersCommand],
})
export class UsersModule {}
