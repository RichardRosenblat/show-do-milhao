import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Controller('/users')
export class UsersCRUDController {
  constructor(private readonly command: UsersCommand) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.command.listAll();
  }
  @Post()
  create(@Body() createUserDTO: CreateUserDTO) {
    return this.command.insert(createUserDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.command.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.command.update(id, updateUserDTO);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.command.delete(id);
  }
}
