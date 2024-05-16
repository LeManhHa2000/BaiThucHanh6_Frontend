import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API
    ,timeout: 30000
});

instance.interceptors.response.use(
    (reponse) => {
        return reponse.data;
    },
    (error) => {
        console.log(error);
    }
);

export default instance;