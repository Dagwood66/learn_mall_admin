function before(app) {
    app.post("/api/login", function (req, res) {
        res.json({
            status: "1",
            data: {
                nickname: "用户1",
                phone: "01234567890"
            }
        });
    })
}

module.exports = before;
