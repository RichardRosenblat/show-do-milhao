import { getAxios } from "../../utils/axios";

export function getRandomQuestionByLevel(token, level, userId) {
	return getAxios(token).get(`/questions/random?level=${level}&user=${userId}`);
}