/**
 * Created by Administrator on 2017/01/12 0012.
 */
import React,{Component} from 'react';
import { hashHistory ,Link } from 'react-router';
import { connect } from 'react-redux';

export default class LoginInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            phoneValue: this.props.phoneValue || ''
        }

    }
    handleChange(event){
        this.props.getValue(
            event.target.value,
            this.props.typeStr,
            this.props.isNew,
        )
        this.setState({
            phoneValue: event.target.value
        })
    }

    handlerFocus(){
        if(this.props.id==='birthDay')
            console.log('输入生日')
    }

    render(){
        return(
            <div className="yhm_login">
                <input
                    onChange={this.handleChange.bind(this)}
                    type={this.props.typeStr}
                    placeholder={this.props.placeholder}
                    id={this.props.id}
                    onFocus={this.handlerFocus.bind(this)}
                    value={this.state.phoneValue}
                    disabled={this.props.disabled}
                />
                { this.props.id==='birthDay' &&
                <label htmlFor="birthDay">
                    {this.props.birthDay || '请选择生日'}
                </label>
                }
            </div>
        )
    }
}