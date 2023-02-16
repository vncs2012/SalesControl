import axios from 'axios';
import Cookies from 'js-cookie';
export const logar = async (data) => {
    let res = await axios
        .post("http://127.0.0.1:8000/login/", data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })
        .then((response) => {
            console.log(response);
            Cookies.set("token", response.data.access_token);
            return response;
        })
        .catch((error) => {
            console.log(error.message);
        });
    return res; 
}