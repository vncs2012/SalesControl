import axios from "axios";
import Cookies from "js-cookie";
import { alertSucesso, alertSystem, hideLoading, showLoading } from "../../util";

const headers = () => {
    let token = Cookies.get("token");
    if (token) {
        return { Authorization: `Bearer ${token}`, };
    }
}

export const getdata = async () => {
    let res = await axios
        .get("http://127.0.0.1:8000/user", { headers })
        .then((response) => {
            return response.data;
        });
    return res;
}

export const insert = async (form) => {
    let res = await axios
        .post("http://127.0.0.1:8000/user", { ...form, headers })
        .then((response) => {
            return response.data;
        });
    return res;
}

export const deleteApi = async (id, state, data_list, id_string) => {
    showLoading()
    let res = await axios
        .delete("http://127.0.0.1:8000/user/" + id, { headers })
        .then((response) => {
            hideLoading()
            if (response.data.status === 200) {
                alertSucesso(false)
                state(data_list.filter(d => d[id_string] !== id))
            } else {
                alertSystem(response.data.message, 'error')
            }
        });
    return res;
}

export const find = async (id) => {
    showLoading()
    let res = await axios
        .get("http://127.0.0.1:8000/user/" + id, { headers })
        .then((response) => {
            hideLoading()
            if (response.data.status === 200) {
                return response.data.user;
            }
            alertSystem(response.data.message, 'error')
        });
    return res;
}

export const update = async (id, form, func) => {
    showLoading()
    let res = await axios
        .put("http://127.0.0.1:8000/user/" + id, { ...form, headers })
        .then((response) => {
            hideLoading()
            if (response.data.status === 200) {
                alertSucesso(true, func)
            } else {
                alertSystem(response.data.message, 'error')
            }
        });
    return res;
}