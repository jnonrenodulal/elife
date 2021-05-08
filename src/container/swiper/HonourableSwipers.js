/**
 * Created by Administrator on 2017/02/27 0027.
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';
import { PageJump } from '../../public/index'
import {changeSwipeIndex} from '../../actions/publicAction'
import {fetchData} from '../../actions/homeAction'
import {fetchGetInfo} from '../../actions/cardAction';
import {disPatchFetchOrder ,showPayPopup,  showDialog} from '../../actions/publicAction'
import './HonourableSwipers.css'
import HonourableItemView from '../../components/swiper/index'


/*
 *
 * pagination: 是否显示分页  true-显示
 *
 */
class HonourableSwipers extends Component{
    constructor(props){
        super(props);
        const {changeSwipeIndex} = this.props;
        this.state = {
            swipeOptions:{
                startSlide: 0,
                speed: 500,
                auto: this.props.pagination==='true' ? 5000 : 0 ,
                continuous: true,
                disableScroll: false,
                stopPropagation: false,
                callback: (index, elem) =>{
                    console.log(index)
                },
                transitionEnd: (index, elem) =>{
                    console.log(index);
                    this.choosePosition(index);
                    if(this.props.pagination==='true'){
                        changeSwipeIndex(index)
                    }
                }
            }
        /*    // swipes 的配置
         swipeOptions : {
                distance: 1800, // 每次移动的距离，卡片的真实宽度
                currentPoint: 0,// 初始位置，默认从0即第一个元素开始
                swTouchend: (ev) => {
                    let data = {
                        moved: ev.moved,
                        originalPoint: ev.originalPoint,
                        newPoint: ev.newPoint,
                        cancelled: ev.cancelled
                    }
                    console.log(data);
                    this.setState({
                        curCard: ev.newPoint
                    })
                }
            }*/
        }
    }

    componentDidMount(){
        const {changeSwipeIndex, fetchGetInfo} = this.props;
        if(this.props.pagination==='true'){
            changeSwipeIndex(0);
        }
        fetchGetInfo({
            type: 1,
            page:1,
        })
    }
    bannerUrlJemp(item){
        PageJump(item.bannerUrl,item.type,item.itemId,1)
    }

    choosePosition(index){
        this.props.choosePosition(index);
    }

    render(){
        const {cardList } = this.props;
        return(
            <div id="swipe">
                { cardList.length &&
                <div className="swipeBox">
                    { this.props.typeStr==="icbc" &&
                    <ReactSwipe ref="ReactSwipe" className="carousel" swipeOptions={this.state.swipeOptions}>
                        {
                            cardList.map((item, index) =>{
                                return(
                                    <div  key={index}
                                          className="swiperHonourable"
                                    >
                                        <HonourableItemView isHaven={item.isAudit} title={item.title} subtitle={item.subtitle} price={item.price}/>
                                    </div>
                                )
                            })
                        }
                    </ReactSwipe>
                    }
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        swipeIndex: state.publicReducer.swipeIndex,
        cardList: state.cardReducer.cardList,
        isShowPayPopup: state.publicReducer.isShowPayPopup,
    }
}

export default connect(
    mapStateToProps,
    {
        fetchGetInfo,showPayPopup,disPatchFetchOrder,changeSwipeIndex
    }
)(HonourableSwipers);