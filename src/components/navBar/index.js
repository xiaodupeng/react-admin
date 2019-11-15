import React from 'react'
import './index.scss'
import MenuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu, switchMenuKey} from '../../redux/action/index'
import { Menu, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
const { SubMenu } = Menu;
class NavBar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            menuTreeNode:"",
        } 
    }
    componentDidMount(){
        // console.log(this.props)
        const menuTreeNode = this.getMenu(MenuList)
        this.setState({
            menuTreeNode:menuTreeNode
        })
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

    // 导出出面包屑数组
    selectBreadcrumb = (FatherKey,ChildKey) => {
        const titleArray = []
        MenuList.forEach((item) => {
            if (item.key === FatherKey) {
                titleArray.push(item.title);
            }
            if (item.children) {              
                item.children.forEach((sItem) => {
                    if (sItem.key === ChildKey) {
                        titleArray.push(sItem.title);      
                    }
                });
            }
        });
        return titleArray;
    };
    // 菜单点击
    handleClick = ({ item, key }) => {
        const FatherKey = '/' + key.split('/')[1] //父元素的key,
        const ChildKey = key //子元素的key,
        const titleArray = this.selectBreadcrumb(FatherKey,ChildKey);
        // 对象结构dispatch
        // const { dispatch } = this.props
        // // 触发dispatch 调用action定义的switchMenu方法，并传值
        // dispatch(switchMenu(item.node.innerText))
        // dispatch(switchMenuKey(key))
        this.props.handleClick(titleArray, key); // 以下是调用mapDispatchToProps方法写法
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
        menuNameKey:state.menuNameKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      handleClick(titleArray, key) {
        dispatch(switchMenu(titleArray));
        dispatch(switchMenuKey(key))
      }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);