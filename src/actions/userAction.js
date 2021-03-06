/**
 * Created by Administrator on 2017/03/03 0003.
 */

import cookie from 'react-cookie'
import {port, isTokenExpired, getUserInfoFn} from '../public'
import {
    GET_USERINFO_SUCCESS, GET_BANKLIST_SUCCESS, GET_MYCOURSELIST_SUCCESS, GET_MYGIFTSLIST_SUCCESS,
    GET_GIFTDETAIL_SUCCESS, GET_ADDRESSLIST_SUCCESS, SET_DEFAULTADDRESS_SUCCESS,
    SET_USERINFO_SUCCESS, FEEDBACK_SUCCESS, CAHNGE_POST_IMGLIST,
    SET_FEEDBACK_SHOW
} from './actionTypes';
import { showDialog, showToastLoading, showToastSuccess } from '../actions/publicAction'


// 设置 反馈信息 是否弹出
export const setFeedBackShow =(feedBackShow)=>{
    return{
        type: SET_FEEDBACK_SHOW,
        feedBackShow
    }
};

// 获取 用户个人信息
const getUserInfoSuccess = (info)=>{
    return{
        type: GET_USERINFO_SUCCESS,
        info
    }
};

// 成功获取银行卡列表
const getBankListSuccess = list =>{
    return{
        type: GET_BANKLIST_SUCCESS,
        list
    }
};

//提示tips的存在时间
const timeStay = 5000;

// 个人信息 设置成功
const setUserInfoSuccess = info => {
    return{
        type: SET_USERINFO_SUCCESS,
        info
    }
};

//反馈信息成功
const feedBackSuccess = () =>{
    return{
       type: FEEDBACK_SUCCESS,
    }
};


//修改 图片数组
export const changePostImgList = (list) =>{
    return{
        type: CAHNGE_POST_IMGLIST,
        list
    }
};


//获取个人课程列表
const getMyCourseListSuccess = (listObj)=>{
    return{
        type: GET_MYCOURSELIST_SUCCESS,
        listObj
    }
};


//礼包中心获取成功
const getMyGiftsListSuccess = (list,userGiftNull) =>{
    return{
        type: GET_MYGIFTSLIST_SUCCESS,
        list,
        userGiftNull,
    }
};

//详情获取成功
const getGiftDetailSuccess =(info)=>{
    return{
        type: GET_GIFTDETAIL_SUCCESS,
        info
    }
};

//获取地址列表成功
const getMyAddressListSuccess = (list)=>{
    return{
        type: GET_ADDRESSLIST_SUCCESS,
        list
    }
};


/*****************************************/
//获取用户个人信息 GET
const getUserInfo =()=>{
    let url = port + '/card/user?token=' + cookie.load('userId');
    return dispatch =>{
        return fetch( url )
            .then( res=>{
                return res.json()
            })
            .then( json=>{
                isTokenExpired(json.code, function () {
                    getUserInfoFn(json);
                    dispatch( getUserInfoSuccess(json))
                })
            })
            .catch( e=>{
                console.log(e)
            })
    }
};


// 获取银行卡列表  GET
const getBankList =()=>{
    return dispatch =>{
        return fetch( port + '/card/card?token=' + cookie.load('userId') )
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code,function () {
                    dispatch(getBankListSuccess(json.list))
                });
            })
            .catch( e =>{
                console.log(e)
            })
    }
};


//设置用户信息 PUT
const setUserInfo =(obj)=>{
    let data = obj.data;
    return dispatch =>{
        dispatch(showToastLoading(true));
        return fetch( port + '/card/user?token=' + cookie.load('userId') ,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res =>{
            return res.json();
        }).then( json =>{
            isTokenExpired(json.code,function () {
                if(json.code === '202'){
                    dispatch(getUserInfo());
                    dispatch(showDialog(false));
                    dispatch(showToastLoading(false));
                    dispatch(showToastSuccess(true));
                    setTimeout(()=>{
                        dispatch(showToastSuccess(false));
                    },1000)
                }
            });
        }).catch(e =>{
            console.log(e)
        })
    }
};


//意见反馈列表上传 POST
const feedBackPost = (obj)=>{
    return dispatch =>{
        return fetch( port + '/card/feedback' ,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then( res =>{
            return res.json();
        }).then( json =>{
            if(json.code === '201'){
                dispatch(feedBackSuccess());
                alert("意见反馈成功")
            }else{
               alert("意见反馈失败")
            }
        }).catch(e =>{
            console.log(e)
        })
    }
};


//图片上传  POST
const upImg = (obj)=>{
    return dispatch=>{
        dispatch(showToastLoading(true));
        return fetch( port+"/card/file/base64.method?fileName=" + Math.floor(Math.random()*1000000)+".png" ,{
            method: 'POST',
            body: obj.imgBase
        }).then( res=>{
            return res.json();
        }).then( json =>{
            console.log(json)
            obj.postImgList.push({pic: json.url});
            dispatch(changePostImgList(obj.postImgList))
        }).catch(e=>{
            console.log(e)
        })
    }
};


// 我的课程列表 GET
const getMyCourseList =()=>{
    return dispatch =>{
        return fetch( port + '/card/scmvOrder/self?token='+cookie.load('userId')+'&tp=' + parseInt(new Date().getTime()/1000))
            .then( res =>{
                return res.json()
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(getMyCourseListSuccess(json.data))
                });
            })
            .catch(e=>{
                console.log(e)
            })
    }
};


// 礼品中心
const getMyGiftList = (obj)=>{
    return dispatch =>{
        return fetch(port + '/card/userGiftConter?currentPage=1&size=10&phone='+obj.phone)
            .then( res=>{
                return res.json();
            })
            .then( json =>{
                if(json.data.list.length===0){
                    dispatch(getMyGiftsListSuccess(json.data.list,true))
                }else {
                    dispatch(getMyGiftsListSuccess(json.data.list,false))
                }
            })
            .catch(e =>{
                console.log(e)
            })
    }
};

//礼包详情
const getGiftDetail = (obj)=>{
    return dispatch =>{
        return fetch(port+'/card/userGiftConter/'+obj.giftId+"?size=100")
            .then( res=>{
                return res.json();
            })
            .then( json =>{
                dispatch(getGiftDetailSuccess(json.data))
            })
            .catch(e =>{
                console.log(e)
            })
    }
};


//地址列表 GET
const getMyAddressList = ()=>{
    return dispatch =>{
        return fetch( port + '/card/receiver?token='+cookie.load('userId')+'&currentPage=1' )
            .then( res=>{
                return res.json();
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(getMyAddressListSuccess(json.list))
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};

//  创建新地址、   更新、设置默认地址   PUT/POST
const setDefaultAddress = (addressObj, isCreate, isEdit)=>{
    let url = '', method='PUT', data = {};
    if(isCreate && !isEdit){
        url = port + '/card/receiver?token='+cookie.load('userId');
        data = addressObj;
        method = 'POST';
    }else{
        url = port + '/card/receiver/'+addressObj.receiveId+'?token='+cookie.load('userId');
        data = {
            isDefault: addressObj.isDefault,
            city: addressObj.city,
            detilAddress: addressObj.detilAddress,
            district: addressObj.district,
            province: addressObj.province,
            receiveId: parseInt(addressObj.receiveId),
            receiverName: addressObj.receiverName,
            receiverPhone: addressObj.receiverPhone
        };
    }

    if(!isCreate && !isEdit){
        data.isDefault = 1
    }

    return dispatch=>{
        return fetch( url ,{
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then( res=>{
            return res.json();
        }).then( json =>{
            isTokenExpired(json.code, function () {
                dispatch(getMyAddressList());
            });
        }).catch(e=>{
            console.log(e)
        })
    }
};


//删除收货地址 http://121.196.232.233/card/receiver/{receiverId}?token=e7120d7a-456b-4471-8f86-ac638b348a53
const deleteAddress = (receiveId)=>{
    return dispatch =>{
        return fetch( port + '/card/receiver/'+receiveId+'?token='+cookie.load('userId'),{
            method: 'DELETE'
        } )
            .then( res=>{
                return res.json();
            })
            .then( json =>{
                isTokenExpired(json.code, function () {
                    dispatch(getMyAddressList());
                });
            })
            .catch(e =>{
                console.log(e)
            })
    }
};



/*
*  type:
*  1 -  获取用户信息
*  2 - 获取银行卡列表
*  3 - 设置更新用户信息
*  4 -  提交反馈意见
*  5 - 图片上传
*  6 - 我的课程列表
*  7 - 礼包中心列表
*  8- 礼包详情
*  9 - 获取地址列表
*  10 -  创建新地址、 设置默认地址  、编辑地址
*  11 - 删除地址
* */
export const dispatchFetchData = (obj)=>{
    return dispatch =>{
        switch (obj.type){
            case 1:
                return dispatch(getUserInfo(obj));
            case 2:
                return dispatch(getBankList(obj));
            case 3:
                return dispatch(setUserInfo(obj));
            case 4:
                if(!obj.feedbackDetail){
                    return
                }
                return dispatch(
                    feedBackPost({
                        feedbackDetail: obj.feedbackDetail,
                        imgList: obj.postImgList
                    })
                );
            case 5:
                return dispatch(upImg(obj));
            case 6:
                return  dispatch(getMyCourseList());
            case 7:
                return dispatch(getMyGiftList(obj));
            case 8:
                return dispatch(getGiftDetail(obj));
            case 9:
                return dispatch(getMyAddressList());
            case 10:
                return dispatch(setDefaultAddress(obj.data, obj.isCreate, obj.isEdit));
            case 11:
                return dispatch(deleteAddress(obj.receiveId));
            default:
                return false
        }
    }
}