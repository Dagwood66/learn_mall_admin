import axios from "axios"

let axiosInstance = axios.create({});

axiosInstance.defaults.timeout = 3000;

axiosInstance.interceptors.request.use(config => {
    return config;
}, err => {
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(response => {
    if (response.data.status !== "1") {
        window.vm.$message.error(response.data.msg);
    }
    return response;
}, err => {
    window.vm.$message.error(err.message);
    return Promise.reject(err);
});

export function postLogin(data) {
    return axiosInstance.post("/api/login", data)
}

export function getUserList(data) {
    return axiosInstance.get("/api/userList", data)
}

export function getGoodsList(data) {
    return axiosInstance.get("/api/goodsList", data)
}

export function getRoleList(data) {
    return axiosInstance.get("/api/roleList", data)
}

export function getPermissionList(data) {
    return axiosInstance.get("/api/permissionList", data)
}

export function getRolePermissionList(data) {
    return axiosInstance.get("/api/rolePermissionList", data)
}

export function getUserRoleList(data) {
    return axiosInstance.get("/api/userRole", data)
}