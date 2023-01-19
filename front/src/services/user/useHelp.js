import { getAxios } from "../../utils/axios";

export function markTime(token, userId, helpType) {
	return getAxios(token).post(`/users/${userId}/help/${helpType}`);
}
