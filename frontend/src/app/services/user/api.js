
import { alertSucesso, alertSystem, hideLoading, showLoading } from "../../util";
import { api } from '../api'

export const getdata = async () => {
    let res = await api.get("user")
    return res;
}

export const insert = async (form) => {
    let res = await api.post("user", { ...form });
    return res;
}

export const deleteApi = async (id, state, data_list, id_string) => {
    showLoading()
    let res = await api.delete("user/" + id)
    if (res.data.status === 200) {
        hideLoading()
        alertSucesso(false)
        state(data_list.filter(d => d[id_string] !== id))
    } else {
        hideLoading()
        alertSystem(res.data.message, 'error')
    }
}

export const find = async (id) => {
    showLoading('Buscando dados...')
    let res = await api.get("user/" + id)
    if (res.data.status === 200) {
        hideLoading()
        return res.data.user;
    }
    alertSystem(res.data.message, 'error')
}

export const update = async (id, form, func) => {
    showLoading()
    let res = await api.patch("user/" + id, { ...form })
    console.log(res)
    if (res.data.status === 201) {
        alertSucesso(true, func)
    } else {
        alertSystem(res.data.message, 'error')
    }
}