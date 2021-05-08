/**
 * Created by Administrator on 2017/04/09 0009.
 */
import React,{Component} from 'react';
import { hashHistory } from 'react-router';
import {connect} from 'react-redux';
import { PageJump } from '../../public/index'
import {disPatchFn} from '../../actions/courseAction'
import { timestampFormat } from '../../public'

//import Using ES6 syntax
import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfoMeta,
    Popup, Toast
} from 'react-weui';

/*
 *  this.props.router - 我的课程 中的引用
 *  this.props.isShow - 24堂课 列表勾选
 *  this.props.url - 视频 、音频
 * */

class RecommendItem extends Component{

    constructor(props){
        super(props);
        this.state = {
            showLoading: false
        }
    }

    handleClick(itemId, itemType){
        PageJump("",itemType,itemId)
        /*console.log("itemType="+itemType)
        if(itemType===1){
            hashHistory.push({
                pathname: `/activity/${itemId}`,
                query: {itemType: 1,itemId: itemId}
            })
        }else if(itemType===3){
            hashHistory.push({
                pathname: `/good/${itemId}`,
                query: {itemType: 3,itemId: itemId}
            })
        }else if(itemType===29){
            hashHistory.push({
                pathname: `/course/${itemId}`,
                query: {itemType: 29 ,itemId: itemId}
            })
            window.location.reload();
        }*/
    }

    chooseItem(course ,event){
        const {disPatchFn ,chooseList} = this.props;
        event.stopPropagation();  //冒泡阻止
        console.log('choose item')
        disPatchFn({
            type: 2,
            course: course,
            chooseList
        })
    }

    render(){
        return(
            <MediaBox
                className={this.props.router?'router':''}
                type="appmsg"
                href="javascript:void(0);"
                onClick={this.handleClick.bind(this, this.props.course.itemId, this.props.course.itemType)}
            >
                { !this.props.course.isShow &&
                <MediaBoxHeader>
                    <img src={this.props.course.pic} role="presentation" />
                </MediaBoxHeader>
                }
                { this.props.course.isShow &&
                <MediaBoxHeader>
                    <img src={this.props.course.pic} role="presentation" />
                    <label
                        className={ this.props.course.isChoose ? "choose" : ''}
                        onClick={this.chooseItem.bind(this ,this.props.course)}
                        htmlFor={this.props.course.id}
                    >
                        <input type="checkbox" name={this.props.course.id}/>
                    </label>
                </MediaBoxHeader>
                }
                <MediaBoxBody className={this.props.router?'router':''}>
                    <MediaBoxTitle>{this.props.course.title}</MediaBoxTitle>
                    <MediaBoxDescription>
                        {this.props.course.subtitle}
                    </MediaBoxDescription>
                </MediaBoxBody>
            </MediaBox>
        )
    }
}

const mapStateToProps = state=>{
    return{
        ...state,
        chooseList: state.courseReducer.two4Class.chooseList
    }
}

export default connect(
    mapStateToProps, {disPatchFn}
)(RecommendItem);


