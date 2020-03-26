let before = require("./mock/index");

module.exports = {
    publicPath: "/admin/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:80/",
                // target: "http://localhost/",
                changeOrigin: true
            }
        },
        before(app) {
            before(app)
        }
    }
};
