import React from 'react'
import './index.scss'
import MenuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu, switchMenuKey} from '../../redux/action/index'
import { Menu, Icon } from 'antd'
import { NavLink , withRouter} from 'react-router-dom'
const { SubMenu } = Menu;
class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuTreeNode:"",
        } 
    }
    componentDidMount(){
        const menuTreeNode = this.getMenu(MenuList)
        this.setState({
            menuTreeNode:menuTreeNode
        })
        this.props.history.listen(route => {
            this.changeMenuKey(route.pathname)
        })
    }
    changeMenuKey(key){
        this.props.changeMenuKey(key);
    }
    // 获取菜单——递归调用法
    getMenu = (data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title=
                        {
                            <span>
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.title}</span>
                            </span>
                        } 
                        key={item.key}>
                        { this.getMenu(item.children) }
                    </SubMenu>
                )
            }
            return  <Menu.Item key={item.key}>
                            <NavLink to={item.key}> 
                                {item.icon ? <Icon type={item.icon} /> : null}
                                <span>{item.title}</span>
                            </NavLink>
                    </Menu.Item>
        })
    }
    // 菜单点击
    handleClick = ({ item, key }) => {
        let obj = {
            name:item.node.innerText,
            key:key
        }
        let arr = this.props.menuTitleArr
        
        if(arr.map(e=>e.name).includes(obj.name)){
            // 以下是调用mapDispatchToProps方法写法
            this.props.handleClick(arr, key);
            return
        }else{
            arr.push(obj)
            // 以下是调用mapDispatchToProps方法写法
            this.props.handleClick(JSON.parse(JSON.stringify(arr)), key); 
        }
        // 对象结构dispatch
        // const { dispatch } = this.props
        // // 触发dispatch 调用action定义的switchMenu方法，并传值
        // dispatch(switchMenu(item.node.innerText))
        // dispatch(switchMenuKey(key))
    };
    render(){
        return (
            <div style={{height:'100%',backgroundColor:"#001529"}}>
                <div className="logo_box">
                    <img width="60" height="60" alt="" src="/assets/logo-ant.svg" />
                    <span>dupeng</span>
                </div>
                <Menu
                    selectedKeys={this.props.menuNameKey}
                    onClick={this.handleClick}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.props.collapsed}
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        collapsed : state.collapsed,
        menuTitleArr:state.menuTitleArr,
        menuNameKey:state.menuNameKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleClick(arr, key) {
        dispatch(switchMenu(arr));
        dispatch(switchMenuKey(key))
      },
      changeMenuKey(key){
        dispatch(switchMenuKey(key))
      }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(NavBar));