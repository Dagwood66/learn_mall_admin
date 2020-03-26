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

function getRoles() {
    let userStr = window.sessionStorage.getItem("roles");
    if (userStr == null || userStr === "") {
        userStr = "[]";
    }
    return JSON.parse(userStr);
}

function setRoles(data) {
    window.sessionStorage.setItem("roles", JSON.stringify(data || []));
}

export default new Vuex.Store({
    state: {
        user: getUser(),
        roles: [], // 异步权限
    },
    mutations: {
        setUser(state, data) {
            setUser(data);
            state.user = data;
        },
        setRoles(state, data) {
            setRoles(data);
            state.roles = data;
        },
    },
    actions: {
        postLogin({commit, state}, products) {
            state.user = {};
            return postLogin(products).then(res => {
                if (res.data.status === "1") {
                    commit("setUser", res.data.data);
                }
                return res;
            }, res => {
                return Promise.reject(res);
            })
        }
    }
})
