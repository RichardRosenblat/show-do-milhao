import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersCommand } from '../command/users.command';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';
import { ObjectId } from 'bson';

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
    return this.command.findById(new ObjectId(id));
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.command.update(new ObjectId(id), updateUserDTO);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.command.delete(new ObjectId(id));
  }
}
