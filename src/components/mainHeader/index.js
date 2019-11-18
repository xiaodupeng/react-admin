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
        this.props.history.listen(route => {
            this.setState({
                currentKey:route.pathname
            })
        })
    }

    handleClick(item,index){
        this.props.history.push(item.key);
    }
    CloseTag(e,item){
        e.stopPropagation()
        if(this.props.menuTitleArr.length>1){
            this.props.menuTitleArr.map((items,index)=>{
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
