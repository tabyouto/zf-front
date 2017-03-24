import * as types from './mutation-types'

export const changeLogin = ({ commit }, loginStatus) => {
    commit(types.LOGIN_STATUS, {
        isLogin: loginStatus
    })
};
export const saveSid = ({ commit }, obj) => {
    commit(types.SID, {
        obj: obj
    })
};
