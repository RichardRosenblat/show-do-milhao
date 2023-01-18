import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO, helpsUsed } from '../dto/updateUser.dto';
import { ObjectId } from 'bson';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { TimeMarkDTO } from '../dto/timeMark.dto';
import { type } from 'os';

@Controller('/users')
export class UsersController {
  constructor(private readonly command: UsersCommand) {}

  @Get()
  findAll() {
    return this.command.listAll();
  }
  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.command.insert(createUserDTO);
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.command.findById(id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.command.update(id, updateUserDTO);
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.command.delete(id);
  }

  @Post('/:id/answer')
  answerQuestion(@Param('id') id: string, @Body() answerData: AnswerDataDTO) {
    return this.command.addAnsweredQuestion(id, answerData);
  }
  
  @Post('/:id/help/:type')
  useHelp(@Param('id') id: string, @Param('type') helpType: string) {
    return this.command.useHelp(id, helpType.toUpperCase());
  }

  @Put('/:id/reset')
  resetUserData(@Param('id') id: string) {
    return this.command.resetUserData(id);
  }

  @Post(':id/time/:type')
  markTime(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { time }: TimeMarkDTO,
  ) {
    return this.command.markTime(id, type.toUpperCase(), new Date(time));
  }
}
