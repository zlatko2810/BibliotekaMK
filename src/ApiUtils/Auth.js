import { requests } from "./AuthRequests";

export const loginUser = (data) => requests.post(`api/auth/authenticate`, data);
export const registerUser = (data) => requests.post(`api/auth/register`, data);
