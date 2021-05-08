/**
 * Created by Administrator on 2017/05/27 0027.
 */
import {
    SET_CARDLIST_STATE,SET_EQUITYCARD_STATE
} from './actionTypes';
import cookie from 'react-cookie';
import { hashHistory } from 'react-router';
import {port} from '../public/index'
//购买card成功状态
export const getCardList=(list)=>{
    return{
        type:SET_CARDLIST_STATE,
        list
    }
}

//权益卡中权益列表
const getEquitySuccess=(list)=>{
    return{
        type:SET_EQUITYCARD_STATE,
        list

    }
}
const EquityList=(obj)=>{
    return dispatch =>{
        return fetch( port+'/card/equityCard/'+obj.id )
            .then(res => {
                console.log(res.status)
                return res.json()
            })
            .then(data => {
                dispatch(getEquitySuccess(data.data.equityContentModels))
            })
            .catch(e =>{
                dispatch();
                console.log(e)
            })
    }
}

function fetchCardList(obj){
        return dispatch =>{
            return fetch( port+'/card/equityCard/listall?currentPage='+obj.page+'&size=10&token='+cookie.load('userId') )
                .then(res => {
                    console.log(res.status)
                    return res.json()
                })
                .then(data => {
                    if(data.code==='666'){
                        cookie.remove('userId')
                        hashHistory.push({
                            pathname: '/login',
                            query: {isNeedBack: 1}
                        })
                        return
                    }
                    dispatch(getCardList(data.data.list))
                })
                .catch(e =>{
                    dispatch();
                    console.log(e)
                })
        }

}
export const fetchGetInfo=(obj)=>{
    return dispatch =>{
        switch (obj.type) {
            case 1:
                return dispatch(fetchCardList(obj));
            case 2:
                return dispatch(EquityList(obj));
            default:
                return false
        }
    }

}