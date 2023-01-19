import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionsCommand } from '../command/questions.command';
import { CreateQuestionDTO } from '../dto/createQuestion.dto';
import { UpdateQuestionDTO } from '../dto/updateQuestion.dto';

@Controller('/questions')
export class QuestionsController {
  constructor(private readonly command: QuestionsCommand) {}

  @Get()
  findAll() {
    return this.command.listAll();
  }

  @Get('/random')
  randomByLevel(@Query('level') level: number, @Query('user') id: string) {
    return this.command.randomByLevel(level, id);
  }

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDTO) {
    return this.command.insert(createQuestionDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.command.findById(id);
  }

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDTO,
  ) {
    return this.command.update(id, updateQuestionDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.command.delete(id);
  }
}
