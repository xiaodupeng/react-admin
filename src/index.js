import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// Provider全局包裹起来才能将store的数据供组件访问
import { Provider } from 'react-redux'

// 使用 PersistGate 包裹根组建。这将延迟渲染app UI直到持久化状态取回并保存到redux中
import { PersistGate } from 'redux-persist/es/integration/react';
import {configureStore,persistor} from './redux/store/index';
import IRouter from './router'
import * as serviceWorker from './serviceWorker';
// Redux Store对象，管理所有的Redux状态
ReactDOM.render(
    <Provider store={configureStore}>
        <PersistGate loading={null} persistor={persistor}>
            <IRouter />
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
