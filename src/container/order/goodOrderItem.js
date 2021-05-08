/**
 * Created by Administrator on 2017/03/15 0015.
 */
import React,{Component} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import { Button } from 'react-weui';
import {fetchOrderList} from '../../actions/orderAciton'

class GoodOrderItem extends Component{
    transFormStatus(status){   // 1-待付款 2-已付款（待发货） 3-已发货
        switch (status){
            case 1:
                return '待付款';
            case 2:
                return '待发货';
            case 3:
                return '已发货';
            case 6:
                return '待评价';
        }
    }

    render(){
        const {OrderCheckGoods,fetchOrderList} = this.props;
        return(
            <div className="goodOrderItem" onClick={()=>{this.props.onClick()}}>
                <h4><span>订单编号: {this.props.order.orderModel.orderId}</span><i>{this.transFormStatus(this.props.order.orderModel.orderState)}</i></h4>
                <div>
                    <img role="presentation" src={this.props.order.detailOrderModels[0].hotPic} />
                    <p>{this.props.order.detailOrderModels[0].goodsTitle}</p>
                    <p>{this.props.order.detailOrderModels[0].skuGague}</p>
                    <p>
                        <span>￥{this.props.order.detailOrderModels[0].skuPrice}</span>
                        <span className="num">×{this.props.order.detailOrderModels[0].count}</span>
                    </p>
                </div>
                <div>
                    <span>总价：<i>￥{this.props.order.detailOrderModels[0].skuPrice * this.props.order.detailOrderModels[0].count}</i></span>
                    { this.props.order.orderModel.orderState === 1&&
                        <Button size="small" className="payNow"
                                onClick={(e)=>{
                                e.stopPropagation();
                                this.props.buy();
                            }}
                        >立即支付</Button>
                    }
                    { this.props.order.orderModel.orderState === 6&&
                    <Button size="small" className="payNow"
                            onClick={()=>{
                                hashHistory.push({
                                    pathname: `/comment`,
                                    query: {
                                        itemType: 3,
                                        itemId: this.props.order.detailOrderModels[0].goodsId,
                                    }
                                });
                            }}
                    >立即评价</Button>
                    }
                    { this.props.order.orderModel.orderState === 3&&
                    <Button size="small" className="payNow"
                            onClick={(e)=>{
                                e.stopPropagation();
                                this.props.confirm();
                            }}
                    >确认收货</Button>
                    }
                    { this.props.order.orderModel.orderState === 1 &&
                        <Button type="default" size="small" className="cancel"
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    this.props.delelte();
                                }}
                        >取消订单</Button>
                    }
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return{
        orderTab: state.orderReducer.orderTab,
        orderStatus: state.orderReducer.orderStatus,
        orderList: state.orderReducer.orderList,
        isLoading: state.orderReducer.isLoading,
        isHideMore: state.orderReducer.isHideMore,
        isShowDeleteSuccess: state.orderReducer.isShowDeleteSuccess,
        receiveAddress: state.orderReducer.receiveAddress
    }
}
export default connect(
    mapStateToProps, {fetchOrderList}
)(GoodOrderItem)
