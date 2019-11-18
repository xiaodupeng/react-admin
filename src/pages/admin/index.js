import React from 'react';
import './index.scss'
import Header from '../../components/header/index'
import MainHeader from '../../components/mainHeader/index'
import NavBar from '../../components/navBar/index'
//withRouter 可以将一个非路由组件包裹为路由组件，使这个非路由组件也能访问到当前路由的match, location, history对象。
import { withRouter } from 'react-router-dom';
// connect 连接redux的数据
import { connect } from 'react-redux'

class Admin extends React.Component{
    componentDidMount(){
        // console.log(this.props)
    }
    render(){
        return (
            <div className="adminContents">
                    <div className="navBar">
                        <NavBar />  
                    </div>
                    <div className="main">
                        <Header />
                        <MainHeader></MainHeader>
                        {/* 放入子路由的组件 */}
                        {this.props.children}
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
export default connect(mapStateToProps)(withRouter(Admin));