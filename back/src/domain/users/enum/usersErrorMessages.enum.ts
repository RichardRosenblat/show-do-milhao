export enum UsersErrorMessagesEnum {
  USER_NOT_FOUND = 'User not found',
  TOO_MANY_MISTAKES = 'User cannot have more than 3 errors before loosing the game, reset the user before proceeding',
  LAST_WRONG_ANSWER = 'This was the last error possible without loosing the game, reset the user before proceeding',
  WRONG_HELP_TYPE = 'Help type must be either cards or skips',
  TOO_MANY_HELPS = 'Help type must be either cards or skips',
  WRONG_TIME_MARK_TYPE = 'Time mark type must be either start or finish',
}
