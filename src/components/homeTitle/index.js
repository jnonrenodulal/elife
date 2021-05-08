/**
 * Created by Administrator on 2017/02/27 0027.
 */
import React,{Component} from 'react';
import {hashHistory} from 'react-router'
import { icbcUrl } from '../../public';
import cookie from 'react-cookie'
import './index.css'

export default class HomeTitle extends Component {

    handleClick(str){
        console.log(' 跳转到：'+str)

        if(str === '工行服务'){
            if(cookie.load('userId')){
                window.location.href = icbcUrl+cookie.load('userId');

            }else{
                hashHistory.push({
                    pathname: '/login',
                    query: {
                        isNeedBack: 1,
                    }
                })
            }

        }
    }
    render(){
        return(
            <h3 className="title">
                <div><span className="content-text">{this.props.title}</span></div>
              <a className="lookMore"
                   onClick={this.handleClick.bind(this, this.props.title)}
                >
                  {this.props.title==='工行服务'?"查看更多 >":""}
                </a>
            </h3>
        )
    }
}