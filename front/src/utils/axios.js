import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_STORIES_URL || "http://localhost:4000";

export function getAxios(token) {
	const headers = token ? { Headers: { Authorization: `Bearer ${token}` } } : {};
	return axios.create({ baseURL: apiBaseUrl, ...headers });
}
