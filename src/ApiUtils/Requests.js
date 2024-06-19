import axios from 'axios';


const getAxiosInstance = (token) => {
    return axios.create({
        baseURL: 'https://bibliotekamk-4931b6242b27.herokuapp.com/api',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
    }, token);
};

const getAxiosInstanceWithoutToken = (token) => {
    return axios.create({
        baseURL: 'https://bibliotekamk-4931b6242b27.herokuapp.com/api',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }, token);
};


export const requests = {
    get: (url, token) => getAxiosInstance(token).get(url),
    put: (url, body, token) => getAxiosInstance(token).put(url, body),
    post: (url, body, token) => getAxiosInstance(token).post(url, body),
    delete: (url, body, token) => getAxiosInstance(token).delete(url, { data: body }),
};

export const requestsWithoutToken = {
    get: (url) => getAxiosInstanceWithoutToken().get(url),
};