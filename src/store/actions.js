import * as types from './mutation-types'

export const changeLogin = ({ commit }, loginStatus) => {
    commit(types.LOGIN_STATUS, {
        isLogin: loginStatus
    })
};