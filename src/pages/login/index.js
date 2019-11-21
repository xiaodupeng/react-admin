import React from 'react'
import './index.scss'
import SlideBlock from '../../components/slideBlock/index'
import { Form, Icon, Input, Checkbox } from 'antd';
import { connect } from 'react-redux'
import { changeToken } from '../../redux/action/index'


class NormalLoginForm extends React.Component{
    state = {
        validateStatus:false
    }
    handleSubmit = e => {
        // e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            // 对象结构dispatch
            const { dispatch } = this.props
            dispatch(changeToken(true))
            this.setState({
                validateStatus:true
            })
            console.log('Received values of form: ', values);
          }else{
              this.setState({
                validateStatus:false
              })
          }
        });
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
           <div className="login-form">
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <SlideBlock validateStatus={this.state.validateStatus} handleSubmit={this.handleSubmit}></SlideBlock>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        {/* <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button> */}
                        
                    </Form.Item>
                    
                </Form>
           </div>
        )
    }
}
const Login = Form.create()(NormalLoginForm);
const mapStateToProps = state => {
    return {
        token : state.token
    }
}
export default connect(mapStateToProps)(Login);