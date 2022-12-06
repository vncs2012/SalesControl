import axios from 'axios';
import Cookies from "js-cookie";
import { alertSucesso, alertSystem, hideLoading, showLoading } from "../util";

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

export const _fetch_all = async (url) => {
	let res = await api.get(url)
	return res;
}

export const _insert = async (url, form) => {
	let res = await api.post(url, { ...form });
	return res;
}

export const _deleteApi = async (url, id, state, data_list, id_string) => {
	showLoading()
	let {data} = await api.delete(`${url}/${id}`)
	if (data.status === 200) {
		hideLoading()
		alertSucesso(false)
		state(data_list.filter(d => d[id_string] !== id))
	} else {
		hideLoading()
		alertSystem(data.message, 'error')
	}
}

export const _find = async (url, id, model) => {
	showLoading('Buscando dados...')
	let { data } = await api.get(`${url}/${id}`)
	if (data.status === 200) {
		hideLoading()
		return data.register;
	}
	alertSystem(data.message, 'error')
}

export const _update = async (url, id, form, func) => {
	showLoading()
	let { data } = await api.patch(`${url}/${id}`, { ...form })
	if (data.status === 201) {
		alertSucesso(true, func)
	} else {
		alertSystem(data.message, 'error')
	}
}

export const _search = async (url, form) => {
	let params = new URLSearchParams(form).toString()
	return await api.get(`${url}?${params}`)
}
