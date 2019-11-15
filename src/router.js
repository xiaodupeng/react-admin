import React from 'react'
import App from './App'
import NotFound from './pages/notFound/index'
import Login from './pages/login/index'
import Admin from './pages/admin/index'
import Home from './pages/home/index'
import Button from './pages/ui/button/index'
import PassValue from './pages/ui/passValue/index'

import { connect } from 'react-redux'



import { HashRouter , Route, Switch, Redirect } from 'react-router-dom'

class IRouter extends React.Component{
    render(){
        let token = this.props.token
        return(
            <HashRouter>
                <App>
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route path="/"
                        // render加载嵌套子路的方法
                            render = {() =>
                                (   
                                    token?
                                    <Admin>
                                        <Switch>
                                            <Route path="/home" component={Home}/>
                                            <Route path="/ui/buttons" component={Button}/>
                                            <Route path="/ui/passValue" component={PassValue}/>

                                            {/*以上都匹配不到则跳转到NotFound*/}
                                            <Route component={NotFound}/> 
                                        </Switch>
                                    </Admin>:<Redirect to="/login" /> 
                                )
                            }
                        />
                        <Redirect to="/login" /> 
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        token : state.token
    }
}
export default connect(mapStateToProps)(IRouter);