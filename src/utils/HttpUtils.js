import axios from "axios"
import da from "element-ui/src/locale/lang/da";

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
        return Promise.reject(response);
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
    return axiosInstance.get("/api/permissionList", {
        params: data
    })
}

export function getPermissionById(id, data) {
    return axiosInstance.get("/api/permission/" + id, {
        params: data
    })
}

export function getRoleById(id) {
    return axiosInstance.get("/api/role/" + id);
}

export function putRoleById(id, data) {
    return axiosInstance.put("/api/role/" + id, data);
}

export function deleteRoleById(id) {
    return axiosInstance.delete("/api/role/" + id)
}

export function postRole(data) {
    return axiosInstance.post("/api/roleAdd", data);
}

export function deletePermissionById(id, data) {
    return axiosInstance.delete("/api/permission/" + id, data);
}

export function postPermission(data) {
    return axiosInstance.post("/api/permissionAdd", data);
}

export function putPermission(id, data) {
    return axiosInstance.put("/api/permission/" + id, data);
}

export function getOrderList() {
    return axiosInstance.get("/api/orderList");
}

export function getRolePermissionById(id, data) {
    return axiosInstance.get("/api/rolePermission/" + id, {
        params: data
    })
}

export function putRolePermissionById(id, data) {
    return axiosInstance.put("/api/rolePermission/" + id, data);
}
