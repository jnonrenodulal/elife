/**
 * Created by Administrator on 2017/07/14 0014.
 */
import {
    CARD_SWIPE_CHOOSE
} from '../actions/actionTypes';

const initState = {
    swipeChosenId:1,
    swipePosition:0,
    swipeChosenIsBuy:false
}
export default function cardSwipeReducer(state=initState, action){
    switch (action.type){
        case CARD_SWIPE_CHOOSE:
            return{
                ...state,
                swipeChosenId:action.id,
                swipeChosenIsBuy:action.isBuy,
                swipePosition:action.index
            };
        default:
            return state;
    }
}