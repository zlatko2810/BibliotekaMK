import { requests, requestsWithoutToken } from './Requests';


export const fetchProducts = () => {
    return requestsWithoutToken.get(`/products/`);
};

export const getProductForEdit = (id, token) => {
    return requests.get(`/products/${id}`, token);
};

export const deleteProduct = (id, token) => {
    return requests.delete(`/products/${id}`, null, token);
};
