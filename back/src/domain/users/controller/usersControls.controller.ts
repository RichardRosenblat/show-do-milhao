import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { AnswerDataDTO } from '../dto/answerData.dto';
import { TimeMarkDTO } from '../dto/timeMark.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('/users')
export class UsersControlsController {
  constructor(private readonly command: UsersCommand) {}

  @Post('/:id/answer')
  @UseGuards(JwtAuthGuard)
  answerQuestion(@Param('id') id: string, @Body() answerData: AnswerDataDTO) {
    return this.command.addAnsweredQuestion(id, answerData);
  }

  @Post('/:id/help/:type')
  @UseGuards(JwtAuthGuard)
  useHelp(@Param('id') id: string, @Param('type') helpType: string) {
    return this.command.useHelp(id, helpType);
  }

  @Put('/:id/reset')
  @UseGuards(JwtAuthGuard)
  resetUserData(@Param('id') id: string) {
    return this.command.resetUserData(id);
  }

  @Post(':id/time/:type')
  @UseGuards(JwtAuthGuard)
  markTime(
    @Param('id') id: string,
    @Param('type') type: string,
    @Body() { time }: TimeMarkDTO,
  ) {
    return this.command.markTime(id, type, new Date(time));
  }
}
