import { requests } from "./Requests";


export const createAuthor = (author, token) => {
    const formData = new URLSearchParams();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);

    return requests.post(`/authors/add`, formData, token);
};

export const fetchAuthors = (token) => {
    return requests.get(`/authors/`, token);
};

export const fetchAuthorById = (id, token) => {
    return requests.get(`/authors/${id}`, token);
};

export const editAuthor = (id, author, token) => {
    const formData = new URLSearchParams();
    formData.append('firstName', author.firstName);
    formData.append('lastName', author.lastName);

    return requests.put(`/authors/${id}`, formData, token);
};

export const deleteAuthor = (id, token) => {
    return requests.post(`/authors/${id}`, null, token);
};