import { _deleteApi, _fetch_all, _find, _insert, _search, _update } from '../api'

const url = 'user'
export const fetch_all = async () => {
    return await _fetch_all(url)
}

export const insert = async (form) => {
    return await _insert(url, form);
}

export const deleteApi = async (id, state, data_list, id_string) => {
    return await _deleteApi(url, id, state, data_list, id_string)
}

export const find = async (id) => {
    return await _find(url, id)
}

export const update = async (id, form, func) => {
    return await _update(url, id, form, func)
}

export const search = async (form) => {
    return await _search(url, form)
}