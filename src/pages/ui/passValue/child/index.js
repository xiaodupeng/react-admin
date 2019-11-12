import React from 'react'
import { Button } from 'antd'

export default class Child extends React.Component{
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    render(){
        return(
            <div>
                <Button onClick={()=>{this.props.addCounts(3)}}>+</Button>
                <Button onClick={()=>{this.props.lessCounts(2)}}>-</Button>
                <span>{this.props.name}</span>
            </div>
        )
    }
}