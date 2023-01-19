import { getAxios } from "../../utils/axios";

export function markTime(token, userId) {
	return getAxios(token).put(`/users/${userId}/reset`);
}
