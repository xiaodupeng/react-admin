import React from 'react'
import './index.scss'
import $ from 'jquery'
import { withRouter } from 'react-router-dom';


class SlideBlock extends React.Component{
    state = {
        confirmWords: '拖动滑块验证',
        confirmSuccess: false,
        distance: "" //滑动成功的宽度（距离）
    }
    componentDidMount(){
        this.setState({
            distance:$(".drag").outerWidth() - $(".btn").outerWidth()
        })
    }
    mousedownFn(e){
        if(this.state.confirmSuccess){
            return;
        }
        this.props.handleSubmit()
        //1.鼠标按下之前必须清除掉后面设置的过渡属性
        document.getElementsByClassName("btn")[0].style.transition = "";
        document.getElementsByClassName("bg")[0].style.transition = "";
        //得到鼠标按下时的水平位置
        var downX = e.clientX;
        document.onmousemove = (e) => {
            //取鼠标移动后的水平位置
            var moveX = e.clientX;
            //得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
            var offsetX = moveX - downX;
            
            if( offsetX > this.state.distance){
                offsetX = this.state.distance;//如果滑过了终点，就将它停留在终点位置
            }else if( offsetX < 0){
                offsetX = 0;//如果滑到了起点的左侧，就将它重置为起点位置
            }
            $('.btn').css({"left":offsetX,"border-top-left-radius":"0px","border-bottom-left-radius":"0px"})
            $('.bg').css({"width":offsetX,"border-top-right-radius":"0px","border-bottom-right-radius":"0px"})
            
            if(this.props.validateStatus === true){
                if(offsetX === this.state.distance){
                    this.setState({
                        confirmSuccess:true,
                        confirmWords:"验证通过"
                    })
                    $('.btn').mousedown = null
                    document.onmousemove = null;
                    $('.btn').css({"background":"#74D339",})
                    $('.btn').html("&radic;")
                    $('.bg').css({"background":"#74D339",})
                    setTimeout(()=>{
                        this.props.history.push('/home');
                    },1000)
                }
            }else{
                $('.btn').css({"left":0,"border-radius": "6px"})
                $('.bg').css({"width":0})
                
                document.getElementsByClassName("btn")[0].style.transition = "0.5s ease";
                document.getElementsByClassName("bg")[0].style.transition = "0.2s ease";
            }

        }

        document.onmouseup = (e) => {
            //如果鼠标松开时，滑到了终点，则验证通过
            if(this.state.confirmSuccess){
                return;
            }else{
                //反之，则将滑块复位（设置了0.5s的属性过渡效果）
                $('.btn').css({"left":0,"border-radius": "6px"})
                $('.bg').css({"width":0})
                
                document.getElementsByClassName("btn")[0].style.transition = "0.5s ease";
                document.getElementsByClassName("bg")[0].style.transition = "0.5s ease";
            }
            //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    render(){
        return(
            <div>
                <div className="drag">
                    <div className="bg"></div>
                    <div className="text">{this.state.confirmWords}</div>
                    <div className="btn" onMouseDown={(e)=>this.mousedownFn(e)}>&gt;&gt;</div>
                </div>
            </div>
        )
    }
}

export default withRouter(SlideBlock)
