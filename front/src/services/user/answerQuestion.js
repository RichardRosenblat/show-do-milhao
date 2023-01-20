import { getAxios } from "../../utils/axios";

export function answerQuestion(token, userId, { questionId, isCorrect, nextQuestion }) {
	return getAxios(token).post(`/users/${userId}/answer`, {
		questionId,
		isCorrect,
		nextQuestion,
	});
}
