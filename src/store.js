import Vue from 'vue'
import Vuex from 'vuex'
import {postLogin} from './utils/HttpUtils'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {}
    },
    mutations: {},
    actions: {
        postLogin({commit, state}, products) {
            state.user = {};
            return postLogin(products).then(res => {
                if (res.data.status === "1") {
                    state.user = res.data.data;
                }
                return res;
            }, res => {
                return Promise.reject(res);
            })
        }
    }
})
