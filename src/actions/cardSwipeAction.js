/**
 * Created by Administrator on 2017/07/14 0014.
 */
import {
    CARD_SWIPE_CHOOSE
} from './actionTypes';

//选中card-swipe的index
export const getCardList=(id,isBuy,index)=>{
    return{
        type:CARD_SWIPE_CHOOSE,
        id,
        isBuy,
        index
    }
}


export const chooseSwipeItem=(cardList,index)=>{
    return dispatch =>{
        return getCardList(cardList[index].id,cardList[index].isBuy,index)
    }

}
