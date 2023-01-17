import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../entitity/user.entity';
import { ObjectId } from 'bson';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { AnsweredQuestionDataDTO } from '../dto/answeredQuestionData.dto';
import { userEntityToResponseDTO } from '../mapper/userEntityToDto';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';

@Injectable()
export class UsersCommand {
  constructor(private readonly repository: UsersRepository) {}

  async listAll() {
    return this.convertToDTO(await this.repository.listAll());
  }
  async findById(id: ObjectId) {
    return this.convertToDTO(await this.repository.findById(id));
  }
  async insert(user: CreateUserDTO) {
    return this.convertToDTO(await this.repository.insert(user));
  }
  async update(id: ObjectId, user: UpdateUserDTO) {
    return this.convertToDTO(await this.repository.update(id, user));
  }
  async addAnsweredQuestion(
    id: ObjectId,
    questionData: AnsweredQuestionDataDTO,
  ) {
    return this.convertToDTO(
      await this.repository.addAnsweredQuestion(id, questionData),
    );
  }
  async useHelp(id: ObjectId, help_used: HelpUsedEnum) {
    return this.convertToDTO(await this.repository.useHelp(id, help_used));
  }
  async doesEmailAlreadyExist(email: string) {
    return await this.repository.doesEmailAlreadyExist(email);
  }
  async findByEmailAndPassword(email: string, password: string) {
    return this.convertToDTO(
      await this.repository.findByEmailAndPassword(email, password),
    );
  }
  async delete(id: ObjectId) {
    return await this.repository.delete(id);
  }
  async markTime(id: ObjectId, type: TimeMarkTypeEnum, time: Date) {
    return this.convertToDTO(await this.repository.markTime(id, type, time));
  }

  convertToDTO(data: User | User[]) {
    if (Array.isArray(data)) {
      return data.map((user) => userEntityToResponseDTO(user));
    }
    return userEntityToResponseDTO(data);
  }
}
