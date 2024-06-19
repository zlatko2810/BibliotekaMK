import { requests, requestsWithoutToken } from "./Requests";


export const createCategory = (category, token) => {
    const formData = new URLSearchParams();
    formData.append('name', category.name);
    if (category.parent) {
        formData.append('parent', category.parent);
    }

    return requests.post(`/categories/add`, formData, token);
};

export const fetchCategories = () => {
    return requestsWithoutToken.get(`/categories/`,);
};

export const fetchCategoryById = (id, token) => {
    return requests.get(`/categories/${id}`, token);
};

export const editCategory = (id, category, token) => {
    const formData = new URLSearchParams();
    formData.append('name', category.name);
    if (category.parent) {
        formData.append('parent', category.parent);
    }
    return requests.put(`/categories/${id}`, formData, token);
};

export const deleteCategory = (id, token) => {
    return requests.delete(`/categories/${id}`, null, token);
};