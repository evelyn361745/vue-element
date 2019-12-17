import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const state={
    latitude: '', // 当前位置维度
    longtitude: '', // 当前位置经度
};

export default new Vuex.store({
    state,
    getters,
    actions,
    mutations
})