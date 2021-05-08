/**
 * Created by Administrator on 2017/07/14 0014.
 */
import React,{Component} from 'react';
import { timestampFormat } from '../../public/index'
import './authorityCardDetailview.css'

export default class AuthorityCardDetailView extends Component{

    render(){
        return(
            <div className="authority">
                <img className="authorityImg" src={this.props.img} />
                <div className="authorityContent">
                    <div className="left">
                        <div className="authorityTitle">{this.props.title}</div>
                        <div className="authoritySubtitle">{this.props.subtitle}</div>
                        <div className="lookDetail"><span>查看详情</span></div>
                        <div className="authorityTime">有效时间:{timestampFormat(this.props.startTime)}-{timestampFormat(this.props.endTime)}</div>
                    </div>
                </div>
            </div>

        )

    }
}