/**
 * reducer 用来处理type
 */

import { type } from '../action/index' 

const initState = {
    token:false,
    collapsed:false,
    menuNames:"首页",
    menuNameKey:"/admin/home"
}

const rootReducer = (state=initState, action) => {
    // 退出登录重置redux状态
    if (action.type === 'USER_LOGOUT') {
      state = initState
    }
    return ebikeData(state, action)
}
  

const ebikeData = ( state, action )=>{
    switch (action.type){
        case type.CHANGE_TOKEN:
            return {
                ...state,
                token:action.token
            }
        case type.SWITCH_MENU:
            return {
                ...state,
                menuNames:action.menuNames
            }
        case type.SWITCH_MENUKEY:
            return {
                ...state,
                menuNameKey:action.menuNameKey
            }            
        case type.SWITCH_COLL:
            return {
                ...state,
                collapsed:action.val
            }   
        default:{
            return {...state}
        }
    }
}

export default rootReducer