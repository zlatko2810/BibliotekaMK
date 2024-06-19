import { defaultReducers } from '../defaultReducers';
import bookConstants from './constants';


const DEFAULT = defaultReducers.books;

export default function books(state = DEFAULT, action = {}) {
    const { type } = action
    switch (type) {
        case bookConstants.CHANGE_ON_BOOK: {
            return {
                ...state,
                changeOnBook: true
            };
        }
        case bookConstants.RESET_CHANGE_ON_BOOK: {
            return {
                ...state,
                changeOnBook: false
            };
        }

        default:
            return state;
    }

}