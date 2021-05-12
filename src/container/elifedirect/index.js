/**
 * Created by Administrator on 2017/08/01 0001.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import {Dialog} from 'react-weui';
import pic1 from '../../img/bankList/ct-Card.png'
import pic2 from '../../img/bankList/bj-Card.png'
import pic3 from '../../img/bankList/pu-Card.png'

import './index.css'

export default class ELifeDirect extends Component{
    linkTo(){
       /* hashHistory.push({
            pathname: `/activity/${this.props.activity.activityId}`,
            query: {itemType: 1,itemId: this.props.activity.activityId}
        })*/
    }

    render(){
        return(
            <div id="fenlei">
                <ul>
                    <li className="zhenpin"
                        onClick={this.linkTo.bind(this,1)}
                    >
                        <img role="presentation" src={pic1}/>
                        <span className="buttonTitle">臻品推荐</span>
                    </li>
                    <li className="quanyi"
                        onClick={this.linkTo.bind(this,2)}
                    >
                        <img role="presentation" src={pic2}/>
                        <span className="buttonTitle">白金权益</span>
                    </li>
                    <li className="activity"
                        onClick={this.linkTo.bind(this,3)}
                    >
                        <img role="presentation" src={pic3}/>
                        <span className="buttonTitle">热门活动</span>
                    </li>
                </ul>
            </div>
        )
    }
}