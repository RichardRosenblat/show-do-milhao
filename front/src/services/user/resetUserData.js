import { getAxios } from "../../utils/axios";

export function resetUserData(token, userId) {
	return getAxios(token).put(`/users/${userId}/reset`);
}
