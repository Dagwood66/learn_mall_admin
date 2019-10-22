module.exports = {
    publicPath:"/admin/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost/",
                changeOrigin: true
            }
        }
    }
};