/**
 * Created by Administrator on 2017/04/13 0013.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import {disPatchFetchOrder ,showPayPopup,  showDialog} from '../../actions/publicAction'
import {
    PanelHeader,
    Button,LoadMore,
    ActionSheet, Popup, Dialog,TextArea
} from 'react-weui';

import {dispatchFetchData} from '../../actions/userAction'
import './index.css'
class GoodOrder extends Component {
    constructor(props){
        super(props);
        const { showPayPopup, showDialog} = this.props;
        this.state = {
            hotPic:this.props.location.query.hotPic,
            goodsTitle:this.props.location.query.goodsTitle,
            number:this.props.location.query.number-0,
            skuGague:this.props.location.query.skuGague,
            skuPrice:this.props.location.query.skuPrice,
            skuId:this.props.location.query.skuId,
            goodsId:this.props.location.query.goodsId,
            stockNumber:this.props.location.query.stockNumber-0,
            receiverName:this.props.location.query.receiverName,
            receiverPhone:this.props.location.query.receiverPhone,
            addressText:this.props.location.query.addressText,
            receiveId:this.props.location.query.receiveId,
            reMark:!this.props.location.query.reMark?"":this.props.location.query.reMark,
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: this.handleSubmitOrderInfo.bind(this, 'wxPay')
            }],
            actions: [{
                label: '取消',
                onClick: ()=>{showPayPopup(false)}
            }],
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '知道了',
                        onClick: ()=>{showDialog(false)}
                    },
                    {
                        type: 'primary',
                        label: '去绑卡',
                        onClick: ()=>{showDialog(false); location.hash='#/myBankCard'}
                    }
                ]
            },
        }
    }
    componentDidMount(){
        const { dispatchFetchData} = this.props;
        dispatchFetchData({type: 9});
    }
    handleChangeNumber(type){
        //type:  0 - 加  1 - 减
        if(type===1){
            if(this.state.number === 1){
                return;
            }else{
                this.setState({
                    number: this.state.number - 1
                })
            }
        }
        if(type === 0){
            if(this.state.number === this.state.stockNumber){
                return
            }else{
                this.setState({
                    number: this.state.number + 1
                })
            }
        }
    }

    handleSubmitOrderInfo(_wxPay){
        const {disPatchFetchOrder, showPayPopup,addressList} = this.props;
        let receiveId=""
        for(let i=0;i<addressList.length;i++){
            if(addressList[i].isDefault==1){
                receiveId=addressList[i].receiveId
            }
        }
        showPayPopup(false);
        let data = {
            receiveId:!this.state.receiveId? receiveId:this.state.receiveId,
            skuId: this.state.skuId,
            num: this.state.number,
            remark:this.state.reMark ,
            icbcManger: "",
            //  icbcManger: '{userId}'   //在创建活动是需要带上这个字段，老版本可不带。主要用于客户经理邀约的情况
        }
        disPatchFetchOrder(
            _wxPay === 'wxPay' ?
                {
                    type: 3,
                    data: data,
                    wxPay: true
                } :
                {
                    type: 3,
                    data: data,

                }
        )
    }
    render() {
        const {
             showPayPopup ,addressList ,isShowPayPopup} = this.props;
        return (
            <div>
                <div className="showOrder">
                        <div className="good">
                            <div className="singleBrand">
                                <img src={this.state.hotPic} className="activityPic"/>
                                <div className="detail">
                                    <h3>{this.state.goodsTitle}</h3>
                                    <p className="subtitle">{this.state.skuGague}</p>
                                    <p className="singleCost">
                                        ￥{this.state.skuPrice*this.state.number}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="message" onClick={()=>{
                            hashHistory.push({
                                pathname: '/myAddress',
                                query: {
                                    hotPic:this.state.hotPic,
                                    goodsTitle:this.state.goodsTitle,
                                    number:this.state.number,
                                    skuGague:this.state.skuGague,
                                    skuPrice:this.state.skuPrice,
                                    skuId:this.state.skuId,
                                    goodsId:this.state.goodsId,
                                    stockNumber:this.state.stockNumber,
                                    reMark:this.state.reMark,
                                    itemType:3
                                }
                            })
                        }}>
                            <h5>收货地址</h5>

                            {
                                addressList.length!==0&&
                                addressList.map((address, index)=> {
                                    if(address.isDefault===1){
                                        return (
                                            <ul key={index}>
                                                <li className="userName">
                                                    <i>收件人:</i><span>{!this.state.receiverName?address.receiverName:this.state.receiverName}</span></li>
                                                <li className="phone">
                                                    <i>联系电话:</i><span>{!this.state.receiverPhone?address.receiverPhone:this.state.receiverPhone}</span></li>
                                                <li className="address">
                                                    <i>地址:</i><span>{!this.state.addressText?address.province+address.city+address.detilAddress:this.state.addressText}</span></li>
                                            </ul>
                                        )
                                    }
                                })
                            }
                            {
                                addressList.length===0&&
                                <ul>
                                    <li className="userName">
                                        <i>收件人:</i><span>{this.state.receiverName}</span></li>
                                    <li className="phone">
                                        <i>联系电话:</i><span>{this.state.receiverPhone}</span></li>
                                    <li className="address">
                                        <i>地址:</i><span>{this.state.addressText}</span></li>
                                </ul>
                            }
                        </div>
                        <div className="moreInfo">
                            <h5>补充信息</h5>
                            <div className="third">
                                <ul>
                                    <li>
                                        <i>购买数量:</i>
                                        <i className="reduce" onClick={this.handleChangeNumber.bind(this, 1)}>－</i>
                                        <i className="number">{this.state.number}</i>
                                        <i className="plus" onClick={this.handleChangeNumber.bind(this, 0)}>＋</i>
                                    </li>
                                    <li>
                                        <i>金额:</i><span>￥{this.state.skuPrice*this.state.number}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="buyerMsg">
                            <h5>买家留言</h5>
                            <div className="msgBox">
                                    <TextArea placeholder="您的特殊要求" rows="2" maxlength="60"  onChange={(e)=>{this.setState({
                                        ...this.state,
                                        reMark: e.target.value
                                    })}}/>
                            </div>
                        </div>
                        <div className="orderBut">
                            <span>￥{this.state.skuPrice*this.state.number}</span>
                            <Button
                                onClick={()=>{
                                    showPayPopup(true);
                                }}>确定</Button>
                        </div>

                    </div>
                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={isShowPayPopup}
                    type="ios"
                    onRequestClose={()=>{showPayPopup(false)}}
                />

            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        addressList: state.userReducer.addressList,
        isShowPayPopup: state.publicReducer.isShowPayPopup,

    }
}
export default connect(
    mapStateToProps, {  showPayPopup,dispatchFetchData,disPatchFetchOrder}
)(GoodOrder)