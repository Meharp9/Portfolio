module.exports = app => {
    const controller = require("../controllers/user_data.controller.js");
    var router = require("express").Router();

    router.post("/create", controller.create);
    router.get("/getAll", controller.findAll);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    app.use('/api/users', router);
}