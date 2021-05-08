/**
 * Created by Administrator on 2017/05/25 0025.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, ActionSheet} from 'react-weui';
import HeaderBar from '../../components/headerNav/headBar';
import {hashHistory} from 'react-router';
import cookie from 'react-cookie'
import './index.css'
import cardImg from '../../img/card/card.png';
import brightImg from '../../img/card/bright.png';
import food from '../../img/card/food.png';
import gift from '../../img/card/gift.png';
import hotel from '../../img/card/hotel.png';
import tour from '../../img/card/tour.png';
import nobrightImg from '../../img/card/nobright.png';
import {fetchGetInfo} from '../../actions/cardAction';
import {disPatchFetchOrder, showPayPopup, showDialog} from '../../actions/publicAction'
import {chooseSwipeItem} from '../../actions/cardSwipeAction';
import {timestampFormat} from '../../public';
import HonourableSwipers from '../swiper/HonourableSwipers'
class CardItem extends Component {
    constructor(props) {
        super(props);
        const {showPayPopup}=this.props
        if (this.props.location.query.token) {
            cookie.save('userId', this.props.location.query.token);
        }

        this.state = {
            menus: [{
                label: '银行卡支付',
                onClick: this.handleSubmitOrderInfo.bind(this)
            }, {
                label: '微信支付',
                onClick: this.handleSubmitOrderInfo.bind(this, 'wxPay')
            }],
            actions: [{
                label: '取消',
                onClick: () => {
                    showPayPopup(false);
                }
            }],
            style2: {
                title: '提示',
                buttons: [
                    {
                        type: 'default',
                        label: '知道了',
                        onClick: () => {
                            showDialog(false)
                        }
                    },
                    {
                        type: 'primary',
                        label: '去绑卡',
                        onClick: () => {
                            showDialog(false);
                            location.hash = '#/myBankCard'
                        }
                    }
                ]
            },
            isPhone: this.props.location.query.isPhone,
            swipePosition: 0,
            swipeChosenId: 1,
            swipeChosenIsBuy: false,
        }
    }

    componentDidMount() {
        const {fetchGetInfo}=this.props
        fetchGetInfo({
            type: 1,
            page: 1,
        })
    }

    handleSubmitOrderInfo(_wxPay) {
        const {disPatchFetchOrder, showPayPopup} = this.props;

        showPayPopup(false);
        disPatchFetchOrder(
            _wxPay === 'wxPay' ?
                {
                    type: 'buyCard',
                    id: this.state.cardId,
                    wxPay: true
                } :
                {
                    type: 'buyCard',
                    id: this.state.cardId,
                }
        )
    }

    choosePosition(index) {
        const { cardList} = this.props;
        console.log('choosePosition = ' + index + " cardList = " + cardList)
        if (cardList.length !== 0) {
            //chooseSwipeItem(cardList, index);
            this.setState({
                swipeChosenId: cardList[index].id,
                swipePosition: index,
                swipeChosenIsBuy: cardList[index].isAudit
            })
        }
    }

    render() {
        const {showPayPopup, isShowPayPopup, disPatchFetchOrder}=this.props
        return (
            <div>
                <div className="panel panel-default">
                    <div className={this.state.isPhone ? "headerBox opa" : "headerBox"}>
                        <HeaderBar content="我的权益"/>
                    </div>
                    <div id="interBox">
                        {
                            !this.state.isPhone &&
                            <div className="het"></div>
                        }
                        <HonourableSwipers pagination="false" typeStr="icbc"
                                           choosePosition={this.choosePosition.bind(this)}/>
                        <div id="boxDetail">
                            {/*{
                             cardList&&
                             cardList.map((data,index)=>{
                             return(

                             /!* <div className={data.isBuy===1&&data.startTime<parseInt(new Date().getTime()/1000)&&data.endTime>parseInt(new Date().getTime()/1000)?"cardBox bright":"cardBox"} key={index}>
                             <img src={cardImg} onClick={()=>{
                             hashHistory.push({
                             pathname: `/cardInterests`,
                             query: {id: data.id,isBuy:data.isBuy,isPhone:this.state.isPhone}
                             })

                             }}/>
                             <div className="cardDetail">
                             <img src={data.isBuy===1?brightImg:nobrightImg}/><label>{data.title}</label>
                             <span>有效期:{timestampFormat(data.startTime,2)}-{timestampFormat(data.endTime,2)}</span>
                             </div>
                             {
                             data.isBuy!==1&&data.endTime>parseInt(new Date().getTime()/1000)&&
                             <Button onClick={()=>{
                             if(this.state.isPhone){
                             disPatchFetchOrder({
                             type: 'buyCard',
                             id: data.id,
                             })
                             }else{
                             showPayPopup(true);
                             this.setState({
                             cardId:data.id
                             })
                             }
                             }}>立即点亮</Button>
                             }

                             </div>*!/
                             )
                             })
                             }*/}
                            <ActionSheet
                                menus={this.state.menus}
                                actions={this.state.actions}
                                show={isShowPayPopup}
                                type="ios"
                                onRequestClose={() => {
                                    showPayPopup(false)
                                }}
                            />
                        </div>
                        <div><span id="tequan">- 专享特权 -</span></div>
                        <div className="bottom">
                            <ul>
                                <li onClick={() => {
                                    hashHistory.push({
                                        pathname: `/cardInterests`,
                                        query: {
                                            id: this.state.swipeChosenId,
                                            isBuy: this.state.swipeChosenIsBuy,
                                            isPhone: this.state.isPhone,
                                            tabNumber: 1,
                                            tabName:'酒店权益'
                                        }
                                    })
                                }
                                }>
                                    <div><img src={hotel}/><span>酒店权益</span></div>
                                </li>
                                <li onClick={() => {
                                    hashHistory.push({
                                        pathname: `/cardInterests`,
                                        query: {
                                            id: this.state.swipeChosenId,
                                            isBuy: this.state.swipeChosenIsBuy,
                                            isPhone: this.state.isPhone,
                                            tabNumber: 2,
                                            tabName:'礼品权益'
                                        }
                                    })
                                }
                                }>
                                    <div><img src={gift}/><span>礼品权益</span></div>
                                </li>
                                <li onClick={() => {
                                    hashHistory.push({
                                        pathname: `/cardInterests`,
                                        query: {
                                            id: this.state.swipeChosenId,
                                            isBuy: this.state.swipeChosenIsBuy,
                                            isPhone: this.state.isPhone,
                                            tabNumber: 3,
                                            tabName:'美食权益'
                                        }
                                    })
                                }
                                }>
                                    <div><img src={food}/><span>美食权益</span></div>
                                </li>
                                <li onClick={() => {
                                    hashHistory.push({
                                        pathname: `/cardInterests`,
                                        query: {
                                            id: this.state.swipeChosenId,
                                            isBuy: this.state.swipeChosenIsBuy,
                                            isPhone: this.state.isPhone,
                                            tabNumber: 4,
                                            tabName:'旅游权益'
                                        }
                                    })
                                }
                                }>
                                    <div><img src={tour}/><span>旅游权益</span></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="footer">
                        {this.state.swipeChosenIsBuy !== 1 &&
                        <Button onClick={() => {
                            if (this.state.isPhone) {
                                disPatchFetchOrder({
                                    type: 'buyCard',
                                    id: this.state.swipeChosenId,
                                })
                            } else {
                                showPayPopup(true);
                                this.setState({
                                    cardId: this.state.swipeChosenId
                                })
                            }
                        }}>立即购买</Button>}
                    </div>
                </div>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        cardList: state.cardReducer.cardList,
        isShowPayPopup: state.publicReducer.isShowPayPopup,

    }
}
export default connect(
    mapStateToProps, {fetchGetInfo, showPayPopup, disPatchFetchOrder}
)(CardItem);