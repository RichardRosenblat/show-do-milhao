import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'bson';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { CreateUserDTO } from '../dto/createUser.dto';
import { ResponseUserDTO } from '../dto/responseUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { User } from '../entitity/user.entity';
import { ErrorsEnum } from '../enum/errors.enum';
import { HelpUsedEnum } from '../enum/helpUsed.enum';
import { TimeMarkTypeEnum } from '../enum/timeMarkType.enum';
import { userEntityToResponseDTO } from '../mapper/userEntityToDto';
import { UsersRepository } from '../repository/users.repository';

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
    const { errors } = await this.findById(id);

    if (!(errors < 3)) {
      throw new BadRequestException(ErrorsEnum.TOO_MANY_MISTAKES);
    }

    const users = await this.repository.addAnsweredQuestion(
      new ObjectId(id),
      answerData,
    );

    return this.convertToDTO(users);
  }
  async useHelp(id: string, help_used: string) {
    const helpUsedType = HelpUsedEnum[help_used];

    if (!helpUsedType) {
      throw new BadRequestException(ErrorsEnum.WRONG_HELP_TYPE);
    }

    const user = await this.findById(id);

    if (!(user.helps_used[helpUsedType] < 3)) {
      throw new BadRequestException(ErrorsEnum.TOO_MANY_HELPS);
    }

    const helpedUser = await this.repository.useHelp(
      new ObjectId(id),
      helpUsedType,
    );
    return this.convertToDTO(helpedUser);
  }
  async markTime(id: string, type: string, time: Date) {
    const timeMarkType = TimeMarkTypeEnum[type];
    if (!timeMarkType) {
      throw new BadRequestException(ErrorsEnum.WRONG_TIME_MARK_TYPE);
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
