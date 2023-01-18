import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class doesUserEmailExists implements ValidatorConstraintInterface {
  constructor(private readonly repository: UsersRepository) {}

  public async validate(email: string) {
    const isEmailInDatabase = await this.repository.doesEmailAlreadyExist(
      email,
    );
    return !isEmailInDatabase;
  }
  defaultMessage() {
    return 'User email must be unique';
  }
}

export const UniqueUserEmail = (options?: ValidationOptions) => {
  return (obj: Object, propName: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName: propName,
      options,
      constraints: [],
      validator: doesUserEmailExists,
    });
  };
};
