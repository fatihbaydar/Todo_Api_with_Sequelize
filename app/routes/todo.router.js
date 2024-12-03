"use strict";

//? ROUTER
// const router = express.Router();
const router = require("express").Router();

// Controller'ı Çağırma
const todo = require("../controllers/todo.controller");

//? LIST TODO:
// router.get("/", todo.list);
//? CRUD
//? 1) CREATE TODO
// router.post("/", todo.create);
//? 2) READ TODO
// router.get("/:id(\\d+)", todo.read);
//? 3) PUT TODO
// router.put("/:id", todo.update);
//? 4) DELETE TODO
// router.delete("/:id", todo.delete);

router.route("/")
.get(todo.list)
.post(todo.create)

router.route("/:id")
.get(todo.read)
.put(todo.update)
.patch(todo.update)
.delete(todo.delete)

module.exports = router;
