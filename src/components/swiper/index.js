/**
 * Created by Administrator on 2017/06/29 0029.
 */
import React,{Component} from 'react';
import { timestampFormat } from '../../public/index'
import './index.css'
import cardImg from '../../img/card/card.png';

export default class HonourableSwiperView extends Component{
    render(){
        return(
            <div className="itemHonourable" >
                <span className={this.props.isHaven===0?"nonhaven":"ishaven"}>{this.props.isHaven===0?"未拥有":"已拥有"}</span>
                <img className="HonourableItemView" src={cardImg} />
                <div className="itemTitleNames">
                    <span className="cardTitle">{this.props.title}</span>
                    <span className="cardSubtitle">{this.props.subtitle}</span>
                    <span className="cardPrice">￥{this.props.price}</span>
                </div>
                <span>查看详情</span>
            </div>

        )
    }
}