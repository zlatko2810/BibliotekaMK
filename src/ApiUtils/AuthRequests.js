import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bibliotekamk-4931b6242b27.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const requests = {
    get: (url) => instance.get(url),
    post: (url, body) => instance.post(url, body)
};
