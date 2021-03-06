/**
 * Created by Administrator on 2017/03/20 0020.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router'

import HeaderBar from '../../components/headerNav/headBar'
import {
    Button, PanelHeader,LoadMore, Toast
} from 'react-weui'

import {fetchCollect} from '../../actions/publicAction'

import './index.css'

class MyCollection extends Component{

    constructor(props){
        super(props);
        this.state ={
            page: 1,
            tabArray: ['活动','臻品', '课程'],
            index: 0
        }
    }

    componentDidMount (){
        const {fetchCollect} = this.props;
        fetchCollect({
            type: 4,
            type2: 1
        })
    }

    handleChangeTab(index){
        const {fetchCollect} = this.props;
        this.setState({index: index});
        fetchCollect({
            type: 4,
            type2: index===0 ? 1 :(index===1?3:29)
        })
    }

    render(){
        const {fetchCollect, collectionList} = this.props;
        return(
            <div id="collect" className="panel panel-default">
                <HeaderBar content="我的收藏"  type="2"/>
                <div className="tab">
                    <div>
                        {
                            this.state.tabArray.map((tab,index)=>{
                                return(
                                    <a key={index}
                                       className={index === this.state.index ? 'active' : ''}
                                       onClick={this.handleChangeTab.bind(this, index)}
                                    >
                                        {tab}
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
                <div style={{height: '100%'}}>
                    { collectionList.length === 0 &&
                        <div className="none">
                            <i />
                            <h3>{this.state.index===0?"您还没有收藏任何活动":(this.state.index===1?"您还没有收藏任何臻品":"您还没有收藏任何课程")}</h3>
                            <a href={this.state.index===0 ? '#/activity' :(this.state.index===1?'':'#/course')  }
                               className="turnPage">再去看看吧&gt;&gt;</a>
                        </div>
                    }
                    {collectionList.length > 0 &&
                        <div className="collectionList">
                            {
                                collectionList.map((collect, index)=>{
                                    return(
                                        <div className="collectItem" key={index}
                                             onClick={()=>{
                                                hashHistory.push({
                                                    pathname: `/${this.state.index===0 ? 'activity' : (this.state.index===1?'good':'course') }/${collect.itemId}` ,
                                                    query: {
                                                        itemType: this.state.index===0 ? 1 :(this.state.index===1?3:29)  ,
                                                        itemId: collect.itemId
                                                    }
                                               })
                                             }}
                                        >
                                            <img src={collect.thumbnail} role="presentation"/>
                                            <div>
                                                <p>{collect.title}</p>
                                                {
                                                    this.state.index!==0&&
                                                    <div>
                                                        <p>{collect.about}</p>
                                                        <p>&yen;{collect.price}</p>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                    {/* <PanelHeader>
                        { !collectionLoading &&
                            <Button
                                type="default" size="small"
                                onClick={()=>{
                                    this.setState({page: this.state.page+1});
                                }}
                            >点击加载更多订单</Button>
                        }
                        { collectionLoading &&
                            <LoadMore loading>Loading</LoadMore>
                        }
                    </PanelHeader>*/}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        collectionList: state.publicReducer.collectionList
    }
}

export default connect(
    mapStateToProps, { fetchCollect }
)(MyCollection)