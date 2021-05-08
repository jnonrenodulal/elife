/**
 * Created by Administrator on 2017/01/05 0005.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import cookie from 'react-cookie';

import Menu from '../../router/menu'
import Myswiper from '../swiper/index'
import ELifeDirect from '../elifedirect/index'
import Content from './Content'

import {fetchData} from '../../actions/homeAction'
import {dispatchFetchData} from '../../actions/userAction'

import './index.css'

class Home extends Component{
    componentDidMount (){
        const {fetchData, dispatchFetchData} = this.props;
        fetchData({
            type: 3,
            page: 1
        });

        // 如果存在token，就去请求银行卡列表
        if(cookie.load('userId')){
            dispatchFetchData({type: 2});
        }
        cookie.remove('token')
    }

    render(){
        const {contentList} = this.props;
        return(
            <div className="panel panel-default">
                <div id="home">
                    <Myswiper pagination="true"  typeStr="icbc" />
                    <ELifeDirect />
                    <div className="totalContentBox">
                        {
                            contentList.map((content,index)=>{
                                return(
                                    <Content
                                        key={index}
                                        list={content.hcpageModels}
                                        type={content.type}
                                        title={content.title}
                                        type2FirsElement={
                                         content.type===2 ? content.type2FirsElement : ''
                                        }
                                    />
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        contentList: state.homeReducer.contentList
    }
}

export default connect(
    mapStateToProps,{
        fetchData, dispatchFetchData
    }
)(Home)