/**
 * Created by Administrator on 2017/02/28 0028.
 */
import React,{Component} from 'react';
import {hashHistory} from 'react-router'
import { PageJump } from '../../public/index'
import './index.css'


class HomeContentList extends Component{

    handlerScroll(e){
        e.preventDefault();
    }

    handleGo(item){
        PageJump(item.url,"","",2)
    }

    render(){
        return(
            <ul
                className={this.props.type === 1?'homeContent type1':
                (this.props.type === 2 ? 'homeContent type2':'homeContent type3')}
                onScroll={this.handlerScroll.bind(this)}
            >
                {
                    this.props.list.map( (item, index)=>{
                        return(
                            <li key={index} onClick={this.handleGo.bind(this, item)}>
                                <div className="imgBox">
                                    <img role="presentation" src={item.pic}/>
                                </div>
                                { (this.props.type === 1 || this.props.type === 2) &&
                                    <span>{item.title}</span>
                                }
                                { this.props.type === 3 &&
                                    <div className="type3Title">
                                        <div>{item.title}</div>
                                        <span>{item.subtitle}</span>
                                    </div>
                                }
                            </li>
                        )
                    } )
                }
            </ul>
        )
    }
}

export default HomeContentList;