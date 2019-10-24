module.exports = {
    publicPath:"/admin/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:8088/",
                changeOrigin: true
            }
        }
    }
};