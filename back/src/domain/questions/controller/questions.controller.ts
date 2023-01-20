import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsCommand } from '../command/questions.command';
import { CreateQuestionDTO } from '../dto/createQuestion.dto';
import { UpdateQuestionDTO } from '../dto/updateQuestion.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('/questions')
export class QuestionsController {
  constructor(private readonly command: QuestionsCommand) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.command.listAll();
  }

  @Get('/random')
  @UseGuards(JwtAuthGuard)
  randomByLevel(@Query('level') level: number, @Query('user') id: string) {
    return this.command.randomByLevel(level, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuestionDto: CreateQuestionDTO) {
    return this.command.insert(createQuestionDto);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.command.findById(id);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDTO,
  ) {
    return this.command.update(id, updateQuestionDto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.command.delete(id);
  }
}
