/**
 * Created by Administrator on 2017/05/25 0025.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import { Tab, TabBody, NavBar, NavBarItem, Article} from 'react-weui';
import cookie from 'react-cookie'
import HeaderBar from '../../components/headerNav/headBar';
import {fetchGetInfo} from '../../actions/cardAction';
import {timestampFormat} from '../../public';
const  list=[
    {
        listName:"酒店权益",
        tab:1,
    },
    {
        listName:"礼品权益",
        tab:2,
    },
    {
        listName:"美食权益",
        tab:3,
    },
    {
        listName:"旅游权益",
        tab:4,
    }
]
class CardInterests extends Component{
    constructor(props){
        super(props);
        this.state = {
            tab:this.props.location.query.tabNumber,
        };
    }
    componentWillMount() {
        const {fetchGetInfo}=this.props
        if(cookie.load('userId')){
            fetchGetInfo({
                type: 2,
                id:this.props.location.query.id
            })
        }else{
            hashHistory.push({
                pathname: '/login',
                query: {
                    isNeedBack: 1,
                }
            })
        }

    }
    render(){
        const {equityList}=this.props
        return(
            <div className="panel panel-default">
                <div className={this.props.location.query.isPhone?"headerBox opa":"headerBox"}>
                    <HeaderBar content="钻卡权益"/>
                </div>
                {
                    !this.props.location.query.isPhone&&
                    <div className="het"></div>
                }

                <Tab>
                    <NavBar>
                        {
                            list.map((data,index)=>{
                                return(
                                    <NavBarItem key={index} active={this.state.tab === data.tab} onClick={e=>this.setState({tab:data.tab})} >{data.listName}</NavBarItem>
                                )
                            })
                        }

                    </NavBar>
                    <TabBody>
                        <Article>
                            {
                                equityList&&
                                equityList.map((data,index)=> {
                                        if(data.type===this.state.tab){
                                            return (
                                                <section key={index} onClick={()=>{
                                                    hashHistory.push({
                                                        pathname: `/interestsInfo`,
                                                        query: {id: data.id,detail:data.detail,title:data.title,isPhone:this.props.location.query.isPhone,isBuy:this.props.location.query.isBuy}
                                                    })
                                                }}>
                                                    <img src={data.pic}/>
                                                    <div>
                                                        <h3>{data.title}</h3>
                                                        <p className="zk">{data.subtitle}</p>
                                                        <p>{timestampFormat(data.endTime,2)}到期</p>
                                                    </div>
                                                </section>
                                            )
                                        }
                                    })
                            }

                        </Article>
                    </TabBody>
                </Tab>
            </div>
        )
    }

}
function mapStateToProps(state) {
    return {
        equityList: state.cardReducer.list,
    }
}
export default connect(
    mapStateToProps,{fetchGetInfo}
)(CardInterests);