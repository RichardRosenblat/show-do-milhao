import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../entitity/user.entity';
import { ObjectId } from 'bson';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { AnsweredQuestionDataDTO } from '../dto/answeredQuestionData.dto';
import { userEntityToResponseDTO } from '../mapper/userEntityToDto';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';
import { ResponseUserDTO } from '../dto/responseUser.dto';
import { ErrorsEnum } from '../enum/errors.enum';

@Injectable()
export class UsersCommand {
  constructor(private readonly repository: UsersRepository) {}

  async listAll() {
    return this.convertToDTO(await this.repository.listAll());
  }
  async findById(id: ObjectId) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND);
    }
    return this.convertToDTO(user);
  }
  async insert(user: CreateUserDTO) {
    const createdUser = await this.repository.insert(user);
    return this.convertToDTO(createdUser);
  }
  async update(id: ObjectId, user: UpdateUserDTO) {
    await this.findById(id);
    const updatedUser = await this.repository.update(id, user);
    return this.convertToDTO(updatedUser);
  }
  async addAnsweredQuestion(
    id: ObjectId,
    questionData: AnsweredQuestionDataDTO,
  ) {
    await this.findById(id);
    const user = await this.repository.addAnsweredQuestion(id, questionData);
    return this.convertToDTO(user);
  }
  async useHelp(id: ObjectId, help_used: HelpUsedEnum) {
    await this.findById(id);
    const user = await this.repository.useHelp(id, help_used);
    return this.convertToDTO(user);
  }
  async doesEmailAlreadyExist(email: string) {
    return await this.repository.doesEmailAlreadyExist(email);
  }
  async findByEmailAndPassword(email: string, password: string) {
    const user = await this.repository.findByEmailAndPassword(email, password);
    if (!user) {
      throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND);
    }
    return this.convertToDTO(user);
  }
  async delete(id: ObjectId) {
    await this.findById(id);
    return await this.repository.delete(id);
  }
  async markTime(id: ObjectId, type: TimeMarkTypeEnum, time: Date) {
    await this.findById(id);
    return this.convertToDTO(await this.repository.markTime(id, type, time));
  }

  private convertToDTO(data: User): ResponseUserDTO;
  private convertToDTO(data: User[]): ResponseUserDTO[];
  private convertToDTO(data: any) {
    if (Array.isArray(data)) {
      return data.map((user) => userEntityToResponseDTO(user));
    }
    return userEntityToResponseDTO(data);
  }
}
