import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../entitity/user.entity';
import { ObjectId } from 'bson';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { userEntityToResponseDTO } from '../mapper/userEntityToDto';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';
import { ResponseUserDTO } from '../dto/responseUser.dto';
import { ErrorsEnum } from '../enum/errors.enum';
import { TimeMarkDTO } from '../dto/timeMark.dto';

@Injectable()
export class UsersCommand {
  constructor(private readonly repository: UsersRepository) {}

  async listAll() {
    return this.convertToDTO(await this.repository.listAll());
  }
  async findById(id: string) {
    const user =
      ObjectId.isValid(id) &&
      (await this.repository.findById(new ObjectId(id)));
    if (!user) {
      throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND);
    }
    return this.convertToDTO(user);
  }
  async insert(user: CreateUserDTO) {
    const createdUser = await this.repository.insert(user);
    return this.convertToDTO(createdUser);
  }
  async update(id: string, user: UpdateUserDTO) {
    await this.findById(id);
    const updatedUser = await this.repository.update(new ObjectId(id), user);
    return this.convertToDTO(updatedUser);
  }
  async delete(id: string) {
    await this.findById(id);
    return await this.repository.delete(new ObjectId(id));
  }

  async addAnsweredQuestion(id: string, answerData: AnswerDataDTO) {
    await this.findById(id);
    const user = await this.repository.addAnsweredQuestion(
      new ObjectId(id),
      answerData,
    );
    return this.convertToDTO(user);
  }
  async useHelp(id: string, help_used: string) {
    if (!HelpUsedEnum[help_used]) {
      throw new BadRequestException('Help type must be either cards or skips');
    }

    await this.findById(id);
    const user = await this.repository.useHelp(
      new ObjectId(id),
      HelpUsedEnum[help_used],
    );
    return this.convertToDTO(user);
  }
  async markTime(id: string, type: string, time: Date) {
    if (!TimeMarkTypeEnum[type]) {
      throw new BadRequestException(
        'Help type must be either start or finish',
      );
    }

    await this.findById(id);
    return this.convertToDTO(
      await this.repository.markTime(
        new ObjectId(id),
        TimeMarkTypeEnum[type],
        time,
      ),
    );
  }
  async resetUserData(id: string) {
    return this.update(id, {
      active_question: null,
      answered_questions: [],
      errors: 0,
      correct_answers: 0,
      finished_date: null,
      start_date: null,
      helps_used: { cards: 0, skips: 0 },
    });
  }
  
  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(ErrorsEnum.USER_NOT_FOUND);
    }
    return this.convertToDTO(user);
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
