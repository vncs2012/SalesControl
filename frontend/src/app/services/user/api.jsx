import axios from "axios";
import Cookies from "js-cookie";

export const getdata = async () => {
    let token = Cookies.get("token");
    if (token) {
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    let res = await axios
        .get("http://127.0.0.1:8000/user", { headers })
        .then((response) => {
            return response.data;
        });
    return res;
    }
};
export const insert = async (form) => {
    let token = Cookies.get("token");
    if (token) {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        let res = await axios
            .post("http://127.0.0.1:8000/user", { ...form, headers })
            .then((response) => {
                return response.data;
            });
        return res;
    }
};