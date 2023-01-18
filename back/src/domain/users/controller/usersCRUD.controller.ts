import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';

@Controller('/users')
export class UsersCRUDController {
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
}
