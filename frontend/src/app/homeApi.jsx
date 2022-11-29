import axios from "axios";

export const getdata = async (Token) => {
    let toke = Token.token;
    const headers = {
        Authorization: `Bearer ${toke}`,
    };
    let res = await axios
        .get("http://127.0.0.1:8000/", { headers })
        .then((response) => {
            return response.data;
        });
    return res;
};