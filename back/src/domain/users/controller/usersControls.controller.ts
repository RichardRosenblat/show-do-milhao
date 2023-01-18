import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { TimeMarkDTO } from '../dto/timeMark.dto';

@Controller('/users')
export class UsersControlsController {
  constructor(private readonly command: UsersCommand) {}
  
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
