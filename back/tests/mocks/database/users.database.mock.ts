import { ObjectId } from 'bson';

interface databaseUser {
  _id: ObjectId;

  email: string;
  name: string;
  password: string;

  answered_questions: ObjectId[];
  correct_answers: number;
  errors: number;

  finished_date: Date;
  start_date: Date;

  active_question: ObjectId;

  helps_used: {
    cards: number;
    skips: number;
  };
}

export let usersMockDatabase: databaseUser[] = [];

resetMockUsersDatabase();

export function resetMockUsersDatabase() {
  usersMockDatabase = [
    {
      _id: new ObjectId(),
      answered_questions: [],
      correct_answers: 0,
      errors: 0,
      finished_date: null,
      start_date: null,
      active_question: null,
      helps_used: {
        cards: 0,
        skips: 0,
      },
      email: 'admin@admin.com',
      name: 'GameAdmin',
      password: '$2b$10$5i.hxWtvW2vJlHa7jDGxjut2nBZbxl/ozXptZzIPUWD01T0tKceM.',
    },
    {
      _id: new ObjectId(),
      answered_questions: [],
      correct_answers: 0,
      errors: 0,
      finished_date: null,
      start_date: null,
      active_question: null,
      helps_used: {
        cards: 0,
        skips: 0,
      },
      email: 'manager@admin.com',
      name: 'GameManager',
      password: '$2b$10$5i.hxWtvW2vJlHa7jDGxjut2nBZbxl/ozXptZzIPUWD01T0tKceM.',
    },
  ];
}
