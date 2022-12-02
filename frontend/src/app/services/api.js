import axios from 'axios';

import { AlertError } from '../components/Alert';
import { Me, LogoutForce } from '../pages/Sistema/Login/services';

const { token } = Me();

export const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
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
				AlertError(data.message);
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
						AlertError(messageError);
						break;
				}

				break;

			case 401:
				if (data.response) {
					AlertError(data.response);
				}

				if (data.message) {
					AlertError(data.message);
				}
				if (data.error) {
					AlertError(data.error);
				}

				break;
			case 405:
				AlertError(data.message);

				break;
			default:
				break;
		}

		throw error;
	},
);

