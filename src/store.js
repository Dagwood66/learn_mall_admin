import Vue from 'vue'
import Vuex from 'vuex'
import {postLogin} from './utils/HttpUtils'

Vue.use(Vuex);


function getUser() {
    let userStr = window.sessionStorage.getItem("user");
    if (userStr == null || userStr === "") {
        userStr = "{}";
    }
    return JSON.parse(userStr);
}

function setUser(data) {
    window.sessionStorage.setItem("user", JSON.stringify(data || {}));
}

export default new Vuex.Store({
    state: {
        user: getUser()
    },
    mutations: {},
    actions: {
        postLogin({commit, state}, products) {
            state.user = {};
            return postLogin(products).then(res => {
                if (res.data.status === "1") {
                    setUser(res.data.data);
                    state.user = res.data.data;
                }
                return res;
            }, res => {
                return Promise.reject(res);
            })
        }
    }
})
