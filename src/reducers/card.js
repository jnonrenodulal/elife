/**
 * Created by Administrator on 2017/05/27 0027.
 */
import {
    SET_CARDLIST_STATE,SET_EQUITYCARD_STATE
} from '../actions/actionTypes';
const initState = {
    brightState:false,
    list:[],
    cardList:[]
}
export default function cardReducer(state=initState, action){
    switch (action.type){
        case SET_CARDLIST_STATE:
            return{
                ...state,
                cardList:action.list
            };
        case SET_EQUITYCARD_STATE:
            return{
                    ...state,
                    list:action.list
                };
        default:
            return state;
    }
}