import { combineReducers } from 'redux';
import {IS_TYPING} from '../Actions/isTyping';
import {JUST_JOINED} from '../Actions/justJoined';
import {NOT_TYPING} from '../Actions/notTyping';

const initState = {
    messages:[],
    typist:null,
    joined:false,
};
const user = (state=initState,action) => {
    switch(action.type) {
        case 'APPEND_MESSAGE':
            // console.log("no what");
            const temp = [...state.messages,action.payload];
            return {
                ...state,
                messages:temp,
            };
        case IS_TYPING:
            return {
                ...state,
                typist:action.payload.handle,
            };
        case JUST_JOINED:
            return {
                ...state,
                joined:action.payload.success,
            };
        case NOT_TYPING:
            return {
                ...state,
                typist:null,
            };
        default:
            return state;
    }
};
const reducer = combineReducers({user});

export default reducer;

