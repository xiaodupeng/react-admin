import React from 'react';
import './index.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { switchColl,logout} from '../../redux/action/index'
import { getUserInfo } from '../../api/user'
import {Icon, Button } from 'antd';
import $ from 'jquery'

class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userName:"",
        }
    }
    componentDidMount(){
        getUserInfo().then(res=>{
            this.setState({
                userName:res.data.name
            })
        })
    }
    
    toggleCollapsed = ()=>{
        console.log(this.props)
        // 对象结构dispatch
        const { dispatch } = this.props
        // 触发dispatch switchColl
        dispatch(switchColl(!this.props.collapsed))
        if(!this.props.collapsed){
            $(".navBar").animate({
                width:'80px'
            },80);
            $(".main").animate({
                left:'80px'
            },80);
            $(".logo_box").hide()
        }else{
            $(".navBar").animate({
                width:'180px'
            },250);
            $(".main").animate({
                left:'180px'
            },250);
            $(".logo_box").show()
        }
    }
    out(){
        const { dispatch } = this.props
        dispatch(logout())
    }
    render(){
        return (
            <div className="Header_box">
                <div className="left">
                        <Button type="primary" onClick={this.toggleCollapsed}>
                        <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </Button>
                        <span style={{marginLeft:"20px"}}>
                        </span>
                </div>
                <div>
                    欢迎 <span className="name">{this.state.userName}</span> 大驾光临

                    <Button className="out" type="danger" onClick={()=>{this.out()}}>退出</Button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        collapsed : state.collapsed
    }
}
export default connect(mapStateToProps)(withRouter(Header));
