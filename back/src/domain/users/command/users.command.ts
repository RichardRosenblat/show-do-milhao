import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../entitity/user.entity';
import { ObjectID } from 'bson';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { AnsweredQuestionData } from '../types/answeredQuestionData.type';
import { userEntityToResponseDTO } from '../mapper/userEntityToDto';

@Injectable()
export class UsersCommand {
  constructor(private readonly repository: UsersRepository) {}

  async listAll() {
    return this.convertToDTO(await this.repository.listAll());
  }

  async findById(id: ObjectID) {
    return this.convertToDTO(await this.repository.findById(id));
  }
  async insert(user: CreateUserDTO) {
    return this.convertToDTO(await this.repository.insert(user));
  }
  async update(id: ObjectID, user: UpdateUserDTO) {
    return this.convertToDTO(await this.repository.update(id, user));
  }
  async addAnsweredQuestion(id: ObjectID, questionData: AnsweredQuestionData) {
    return this.convertToDTO(
      await this.repository.addAnsweredQuestion(id, questionData),
    );
  }
  async useHelp(id: ObjectID, help_used: 'cards' | 'skips') {
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
  async delete(id: ObjectID) {
    return await this.repository.delete(id);
  }

  convertToDTO(data: User | User[]) {
    if (Array.isArray(data)) {
      return data.map((user) => userEntityToResponseDTO(user));
    }
    return userEntityToResponseDTO(data);
  }
}
