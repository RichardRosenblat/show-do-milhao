import { QuestionDTO } from '../dto/question.dto';

export function questionEntityToResponseDTO(user: QuestionDTO) {
  if (!user) {
    return null;
  }
  const dto = new QuestionDTO();

  Object.entries(user).forEach(([k, v]) => (dto[k] = v));

  return dto;
}
