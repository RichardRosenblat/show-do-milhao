import { getAxios } from "../../utils/axios";

export function signIn(email, password) {
	return getAxios().post(`/login`, {
		email,
		password,
	});
}
