/**
 * Created by Administrator on 2017/06/05 0005.
 */
import React,{Component} from 'react';
import HeaderBar from '../../components/headerNav/headBar';
export default class InterestsInfo extends Component{
    render(){
        return(
            <div className="panel panel-default">

                    <div className={this.props.location.query.isPhone?"headerBox detail opa":"headerBox detail"}>
                        <HeaderBar content={this.props.location.query.title+'优惠套餐'}/>
                    </div>
                    {
                        !this.props.location.query.isPhone&&
                        <div className="het"></div>
                    }
                <div className="content_detail">
                    <div id="content"
                         dangerouslySetInnerHTML={{__html: this.props.location.query.detail}}>
                    </div>
                    {
                        this.props.location.query.title.indexOf('希尔顿')!=-1&&this.props.location.query.isBuy==1&&
                        <div className="yhq">
                            <p>优惠券码: D113139661</p>
                            <p>适用于希尔顿集团在中国区的希尔顿和希尔顿逸林品牌的酒店</p>
                        </div>

                    }
                </div>


            </div>
        )
    }

}
