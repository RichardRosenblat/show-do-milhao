import { getAxios } from "../../utils/axios";

export function markTime(token, userId, timeMarkType, time) {
	return getAxios(token).post(`/users/${userId}/time/${timeMarkType}`, { time });
}
