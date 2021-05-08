/**
 * Created by Administrator on 2017/03/13 0013.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import HeaderBar from '../../components/headerNav/headBar'
import {Popup} from 'react-weui'
import {dispatchFetchData} from  '../../actions/userAction'
import GiftItem from '../../components/myInfo/giftItem'
import {hashHistory} from 'react-router';
import './index.css'

class MyGift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailShow: false,
            userPhone: this.props.location.query.phone
        }
    }

    componentDidMount() {
        const {dispatchFetchData} =this.props
        dispatchFetchData({
            type: 7,
            phone: this.state.userPhone
        })
    }

    render() {
        const style = {
            color: '#999',
            background: 'none',
            padding: 0,
        };
        const {userGiftList}=this.props;
        return (
            <div>
                {
                    userGiftList.length === 0 &&
                    <div id="myGift" className="panel panel-default">
                        <HeaderBar content="我的礼包" type="2"/>
                        <div className="none">
                            <i />
                            <h3>您还没有礼包</h3>
                        </div>
                    </div>
                }
                {
                    userGiftList.length !== 0 &&
                    <div id="myGift" className="panel panel-default">
                        <HeaderBar content="我的礼包" type="2"/>
                        <div className="list clearfix">
                            {
                                userGiftList.map((giftList, index) => {
                                    return (
                                        <GiftItem
                                            key={index}
                                            giftList={giftList}
                                            onClick={() => {
                                                hashHistory.push({
                                                    pathname: `/myGiftDetail`,
                                                    query: {
                                                        userPhone: this.state.userPhone,
                                                        giftId: giftList.id,
                                                        centerModel: giftList.centerModel
                                                    }
                                                })
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userGiftList: state.userReducer.userGiftList,
    }
}

export default connect(
    mapStateToProps, {dispatchFetchData}
)(MyGift)