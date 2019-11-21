import React from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import { switchMenu} from '../../redux/action/index'


class MainHeader extends React.Component{
    state = {
        TagsTreeNode:"",
        currentKey:"/home"
    };
    componentDidMount(){
        //监听路由的两种方式

        // this.props.history.listen(route => {
        //     console.log(route)
        //     this.setState({
        //         currentKey:route.pathname
        //     })
        // })
        window.addEventListener('hashchange',this.listenRoute)
    }
    // 此方法在组件被卸载前调用，可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清除componentDidMount中手动创建的DOM元素等，以避免引起内存泄漏
    componentWillUnmount(){
        window.removeEventListener('hashchange',this.listenRoute)
    }

    listenRoute = ()=>{
        this.setState({
            currentKey:window.location.hash.substring(1)
        })
    }
    handleClick(item,index){
        this.props.history.push(item.key);
    }
    CloseTag(e,item){
        e.stopPropagation()
        if(this.props.menuTitleArr.length>1){
            this.props.menuTitleArr.forEach((items,index)=>{
                if(items.key === item.key){
                    this.props.menuTitleArr.splice(index,1);
                    if(this.props.history.location.pathname === item.key){
                        let end = this.props.menuTitleArr[this.props.menuTitleArr.length-1]
                        this.props.history.push(end.key);
                    }
                }
            })
            let arr = JSON.parse(JSON.stringify(this.props.menuTitleArr))
            const { dispatch } = this.props
            dispatch(switchMenu(arr))
        }
        
    }
    render(){
        return(
            <div className="MainHeader">
                {this.props.menuTitleArr.map((item,index)=>{
                    return (
                        <div className={`tag ${item.key===this.state.currentKey?"activetag":"noactivetag"}`}  key={index} onClick={()=>this.handleClick(item,index)}>
                            <span>{item.name}</span>
                            <Icon type="close" onClick={(e)=>this.CloseTag(e,item)}/>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        menuTitleArr : state.menuTitleArr
    }
}
export default connect(mapStateToProps)(withRouter(MainHeader));
