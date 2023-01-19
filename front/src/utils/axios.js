import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000";

export function getAxios(token) {
	const headers = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
	return axios.create({ baseURL: apiBaseUrl, ...headers });
}
