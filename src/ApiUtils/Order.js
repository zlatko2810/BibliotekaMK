import { requests } from "./Requests";



export const fetchUserOrders = (email, token) => {
    const url = `/orders?email=${encodeURIComponent(email)}`;
    return requests.get(url, token);
};


export const addProductToShoppingCart = (productId, email, token) => {

    const formData = new URLSearchParams();
    formData.append('productId', productId);
    formData.append('email', email);

    return requests.post('/shopping-cart/add', formData, token);
};


export const removeProductFromShoppingCart = (productId, email, token) => {

    const formData = new URLSearchParams();
    formData.append('productId', productId);
    formData.append('email', email);

    return requests.post('/shopping-cart/delete', formData, token);
};

