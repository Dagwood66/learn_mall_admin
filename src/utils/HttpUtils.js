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
        return Promise.reject(response);
    }
    return response;
}, err => {
    if (err.code === "ECONNABORTED") {
        window.vm.$message.error(`${err.message}`);
    } else if (err.response.status === 401) {
        let vm = window.vm;
        vm.$router.push({
            path: "/login",
            query: {
                ...vm.$route.query,
                redirect: vm.$route.path
            },
        })
    } else {
        window.vm.$message.error(`${err.response.status} ： ${err.response.data.msg || err.message}`);
    }
    return Promise.reject(err);
});

export function postLogin(data) {
    return axiosInstance.post("/api/login", data)
}

export function getLoginOut(data) {
    return axiosInstance.get("/api/loginOut", data)
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

export function putGoodsById(id, data) {
    return axiosInstance.put("/api/goods/" + id, data);
}

export function deleteRoleById(id) {
    return axiosInstance.delete("/api/role/" + id)
}

export function postRole(data) {
    return axiosInstance.post("/api/roleAdd", data);
}

export function deleteGoodsById(id, data) {
    return axiosInstance.delete("/api/goods/" + id, data);
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

export function getOrderList(data) {
    return axiosInstance.get("/api/orderList", {
        params: data
    });
}

export function getPermissionPageList(data) {
    return axiosInstance.get("/api/permissionPageList", {
        params: data
    });
}

export function getRolePermissionById(id, data) {
    return axiosInstance.get("/api/rolePermission/" + id, {
        params: data
    })
}

export function putRolePermissionById(id, data) {
    return axiosInstance.put("/api/rolePermission/" + id, data);
}

export function postGoods(data) {
    return axiosInstance.post("/api/goodsAdd", data);
}

export function getGoodsById(id) {
    return axiosInstance.get("/api/goods/" + id);
}
