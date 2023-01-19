import { getAxios } from "../../utils/axios";

export function createUser(name, email, password) {
	return getAxios().post(`/users`, {
		name,
		email,
		password,
	});
}
