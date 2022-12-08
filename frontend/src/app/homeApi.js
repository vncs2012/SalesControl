
import { _fetch_all } from './services/api'

const url = '/'
export const get_home = async () => {
    return await _fetch_all(url)
}
