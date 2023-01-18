import { Injectable } from "@nestjs/common";

import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { QuestionsRepository } from "../repository/questions.repository";
import { ObjectId } from "bson";

@Injectable()
@ValidatorConstraint({ async: true })
export class doesQuestionExists implements ValidatorConstraintInterface {
    
    constructor(private readonly repository:QuestionsRepository){}
    
    public async validate(id: ObjectId){       
        const doesQuestionExistInDatabase = !!(await this.repository.findById(id));
       return doesQuestionExistInDatabase
    }
    defaultMessage({property}: ValidationArguments){
        return `${property} must contain the Id of an existing question`
    };
}

export const isExistingQuestion = (options?: ValidationOptions) => {
    return (obj: Object, propName: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: propName,
            options,
            constraints: [],
            validator: doesQuestionExists,
        });
    };
};