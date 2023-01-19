import { getAxios } from "../../utils/axios";

export function useHelp(token, userId, helpType) {
	return getAxios(token).post(`/users/${userId}/help/${helpType}`);
}
