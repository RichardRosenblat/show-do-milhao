import { ObjectId } from 'bson';

export class QuestionEntity {
  constructor(
    public _id: ObjectId,
    public text: string,
    public category: string,
    public level: number,
    public hint: string,
    public answers: {
      text: string;
      isCorrect: boolean;
    }[],
  ) {}
}
