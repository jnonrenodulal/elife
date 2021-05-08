/**
 * Created by Administrator on 2017/02/28 0028.
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import HomeContentList from '../../components/homeContentList'
import HomeTitle from '../../components/homeTitle'
import { PageJump } from '../../public/index'

class Content extends Component{
    
    render(){
        return(
            <div className={this.props.type===2 ? 'contentBox type2' : 'contentBox'}>
                { this.props.type !== 2 &&
                    <div>
                        <HomeTitle
                            title={this.props.title}
                            type={this.props.type}
                        />
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.list}
                        />
                    </div>
                }
                { this.props.type === 2 &&
                    <div className="contentBoxTwo">
                        <img role="presentation" src={this.props.type2FirsElement.pic} onClick={()=>{
                            PageJump(this.props.type2FirsElement.url,"","",2)
                        }
                        }/>
                        <HomeContentList
                            type={this.props.type}
                            list={this.props.list}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default connect()(Content);