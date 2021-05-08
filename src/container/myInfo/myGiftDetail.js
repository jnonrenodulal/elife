/**
 * Created by Administrator on 2017/07/25 0025.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import { Popup } from 'react-weui'
import {dispatchFetchData} from  '../../actions/userAction'
import GiftItem from '../../components/myInfo/giftItem'
import './index.css'

class MyGiftDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            detailShow: false,
            userPhone:this.props.location.query.isPhone,
            giftId:this.props.location.query.giftId,
            centerModel:this.props.location.query.centerModel
        }
    }
    componentDidMount(){
        const {dispatchFetchData} =this.props
        dispatchFetchData({
            type: 8,
            phone:this.state.userPhone,
            giftId:this.state.giftId
        })
    }

    render(){
        const {giftDetail}=this.props;
        return(
            <div>
                giftDetail.id
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        giftDetail:state.userReducer.giftDetail,
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData}
)(MyGiftDetail)