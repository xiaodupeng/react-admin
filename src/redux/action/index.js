/*
 * action 操作的类型
 */

export const type = {
    SWITCH_COLL:'SWITCH_COLL',
    SWITCH_MENU : 'SWITCH_MENU',
    SWITCH_MENUKEY : 'SWITCH_MENUKEY',
    CHANGE_TOKEN : 'CHANGE_TOKEN',
    USER_LOGOUT:"USER_LOGOUT"
 }

// 登录传入token
export function changeToken (token) {
    return {
        type:type.CHANGE_TOKEN,
        token
    }
}

// 退出登录
export function logout () {
    return {
        type:type.USER_LOGOUT,
    }
}

// 点击展开关闭navBar
export function switchColl (val) {
    return {
        type:type.SWITCH_COLL,
        val
    }
}

// 菜单点击切换，修改面包屑名称 ,传入值
export function switchMenu (menuNames) {
    return {
        type:type.SWITCH_MENU,
        menuNames
    }
}

// 菜单点击切换，传入值key值
export function switchMenuKey (menuNameKey) {
    return {
        type:type.SWITCH_MENUKEY,
        menuNameKey
    }
}