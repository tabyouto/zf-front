import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getter'
import mutations from './mutations';
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
    isLogin: sessionStorage.getItem('isLogin') == 'true' ? true : false,
    socketInfo: {
      sid: sessionStorage.getItem('sid') ? sessionStorage.getItem('sid') : '',
      clientCreateId: sessionStorage.getItem('clientId') ? sessionStorage.getItem('clientId') : ''
    }
};

export default new Vuex.Store({
    state,
    actions,
    getters,
    mutations,
    modules: {
        // cart,
        // products
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
})
