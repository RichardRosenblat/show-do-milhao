import { Injectable } from '@nestjs/common/decorators';
import { QuestionsRepository } from '../repository/questions.repository';
import { CreateQuestionDTO } from '../dto/createQuestion.dto';
import { UpdateQuestionDTO } from '../dto/updateQuestion.dto';
import { Question } from '../entities/question.entity';
import { QuestionDTO } from '../dto/question.dto';
import { questionEntityToResponseDTO } from '../mappers/questionEntityToDto';
import { ObjectId } from 'bson';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { QuestionsErrorMessageEnum } from '../enums/questionsErrorMessages.enum';
import { UsersCommand } from '../../users/command/users.command';

@Injectable()
export class QuestionsCommand {
  constructor(
    private readonly repository: QuestionsRepository,
    private readonly usersCommand: UsersCommand,
  ) {}

  async listAll() {
    const questions = await this.repository.listAll();
    return this.convertToDTO(questions);
  }

  async randomByLevel(level: number, userId: string) {
    const isLevelNumber = isNaN(+level) || !isFinite(+level);

    if (isLevelNumber || level > 10 || level < 1) {
      throw new BadRequestException(QuestionsErrorMessageEnum.INVALID_LEVEL);
    }

    const questionsByLevel = await this.repository.listByLevel(level);
    const { answered_questions } = await this.usersCommand.findById(userId);

    const filteredQuestions = questionsByLevel.filter((question) => {
      const questionId = question._id.toHexString();

      const hasUserAnswered = answered_questions.some((answeredQuestionId) => {
        return answeredQuestionId.toHexString() === questionId;
      });
      
     
      return !hasUserAnswered;
    });
    if(!filteredQuestions.length){
      throw new InternalServerErrorException(QuestionsErrorMessageEnum.NO_MORE_QUESTIONS);
      
    }
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);

    return filteredQuestions[randomIndex];
  }

  async findById(id: string) {
    const question =
      ObjectId.isValid(id) &&
      (await this.repository.findById(new ObjectId(id)));
    if (!question) {
      throw new NotFoundException(QuestionsErrorMessageEnum.QUESTION_NOT_FOUND);
    }
    return this.convertToDTO(question);
  }

  async insert(question: CreateQuestionDTO) {
    const createdQuestion = await this.repository.insert(question);
    return this.convertToDTO(createdQuestion);
  }

  async update(id: string, question: UpdateQuestionDTO) {
    await this.findById(id);
    const updatedQuestion = await this.repository.update(
      new ObjectId(id),
      question,
    );
    return this.convertToDTO(updatedQuestion);
  }

  async delete(id: string) {
    await this.findById(id);
    return this.repository.delete(new ObjectId(id));
  }

  private convertToDTO(data: Question): QuestionDTO;
  private convertToDTO(data: Question[]): QuestionDTO[];
  private convertToDTO(data: any) {
    if (Array.isArray(data)) {
      return data.map((user) => questionEntityToResponseDTO(user));
    }
    return questionEntityToResponseDTO(data);
  }
}
