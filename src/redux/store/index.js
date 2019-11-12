// 引入createStore创建store，引入applyMiddleware 来使用中间件
import {createStore} from 'redux'

// 引入所有的reducer
import reducer from '../reducer/index';

// 数据持久化  存储机制，可换成其他机制，当前使用sessionStorage机制
import {persistStore, persistReducer} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'

// 数据对象
const storageConfig = {
    key: 'root', // 必须有的
    storage:storageSession,//缓存机制
    blacklist: ['collapsed'] // reducer 里不持久化的数据
}
const myPersistReducer = persistReducer(storageConfig, reducer)
const configureStore = createStore(myPersistReducer)
const persistor = persistStore(configureStore)
export {configureStore,persistor}



// const configureStore = createStore(reducer)

// export default configureStore