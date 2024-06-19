import { accessToken, books } from "../../modules";

import { combineReducers } from 'redux';
const appReducer = combineReducers({
    accessToken,
    books
})

export default function rootReducer(state, action) {
    let finalState = appReducer(state, action);

    return finalState;
}
