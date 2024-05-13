import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import customer from './modules/customer'
import groupList from './modules/groupList'
import getCustomers from './modules/getCustomers'
import enterpriseRiskControl from './modules/enterpriseRiskControl'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        app,
        user,
        permission,
        customer,
        groupList,
        getCustomers,
        enterpriseRiskControl
    },
    state: {

    },
    mutations: {

    },
    actions: {

    },
    getters
})