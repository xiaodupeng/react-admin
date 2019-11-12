import React from 'react'
import Child from './child/index'

export default class PassValue extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            count:0,
            fatherValue:"我来自父组件1"
        }
    }
    // 初始化也可以这样写
    // state = {
    //     count:0,
    //     fatherValue:"我来自父组件1"
    // }
    // 接受子组件传来的值
    addCount(num){
        let count = this.state.count
        this.setState({
            count:count+=num
        })
    }
    lessCount(num){
        let count = this.state.count
        this.setState({
            fatherValue:"我来自父组件2",
            count:count-=num
        })
    }
    render(){
        return(
            <div>
                <Child name={this.state.fatherValue} lessCounts={(num)=>this.lessCount(num)} addCounts={(num)=>this.addCount(num)}></Child>
                <span>
                    父组件count:{this.state.count}
                </span>
            </div>
        )
    }
}