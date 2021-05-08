/**
 * Created by Administrator on 2017/05/19 0019.
 */
import React,{Component} from 'react';
import { timestampFormat } from '../../public/index'

export default class GiftItem extends Component{
    render(){
        return(
            <div className="itemGift" >
                <span className="status">{this.props.giftList.isUse===0?"未使用":(this.props.giftList.isUse===1?"已使用":"其他")}</span>
                <img role="presentation" src={this.props.giftList.centerModel.maxPic} />
                <div>
                    <span className="giftName">{this.props.giftList.centerModel.title}</span>
                    <span className="time">{timestampFormat(this.props.giftList.centerModel.startTime,3)}</span>
                </div>
            </div>

        )
    }
}