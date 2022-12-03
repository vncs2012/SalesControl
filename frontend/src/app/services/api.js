import axios from 'axios';
import { alertSystem } from '../util';
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
	headers: {
		Authorization: `Basic ${token}`,
	},
});

api.interceptors.response.use(
	response => response,
	error => {
		const { status, data } = error.response;
		const messageError = data.error === undefined ? data.response : data.error;

		switch (status) {
			case 500:
				alertSystem(data.message, 'error');
				break;
			case 400:
				switch (messageError) {
					case `Token is Invalid`:
						LogoutForce();
						break;
					case `Token is Expired`:
						LogoutForce();
						break;
					default:
						alertSystem(messageError, 'error');
						break;
				}
				break;

			case 401:
				if (data.response) {
					alertSystem(data.response, 'error');
				}

				if (data.message) {
					alertSystem(data.message, 'error');
				}
				if (data.error) {
					alertSystem(data.error, 'error');
				}
				break;
			case 405:
				alertSystem(data.message, 'error');
				break;
			default:
				break;
		}

		throw error;
	},
);

const LogoutForce = () => {
	Cookies.remove("token")
}
