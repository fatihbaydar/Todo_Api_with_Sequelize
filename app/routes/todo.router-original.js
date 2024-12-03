"use strict";

//? ROUTER
// const router = express.Router();
const router = require("express").Router();

const Todo = require("../models/todo.model")

//? LIST TODO:
router.get("/", async (req, res) => {
  // const data = await Todo.findAll()
  // const data = await Todo.findAll({
  // attributes:["title", "description", "priority"], // alan seçimi
  // where: {priority:1} //filtreleme
  // })
  const data = await Todo.findAndCountAll();
  res.status(200).send({
    error: false,
    result: data,
  });
});

//? CRUD
//? 1) CREATE TODO

router.post("/", async (req, res) => {
  //   const receivedData = req.body;
  //   console.log(receivedData);

  //   const data = await Todo.create({
  //     title: receivedData.title,
  //     description: receivedData.description,
  //     priority: receivedData.priority,
  //     isDone: receivedData.priority,
  //   });
  const data = await Todo.create(req.body);
  res.status(201).send({
    error: false,
    result: data,
  });
});

//? 2) READ TODO
router.get("/:id(\\d+)", async (req, res) => {
  // const data = await Todo.findOne({where: {id:req.params.id}})
  const data = await Todo.findByPk(req.params.id);
  res.status(200).send({
    error: false,
    result: data,
  });
});

//? 3) PUT TODO
router.put("/:id", async (req, res) => {
  // const data = await Todo.update({newData}, {where})
  const data = await Todo.update(req.body, { where: { id: req.params.id } }); // req.params kendisi obje olduğuu için {} açmaya gerek yok
  //upsert: kayıt varsa güncelle yoksa ekle

  // res.status(202).send({
  //   error:false,
  //   result:data, // kaç adet güncellendiği bilgisi döner.
  //   message:"güncellendi",
  //   new: await Todo.findByPk(req.params.id)
  // })

  res.status(202).send({
    error: false,
    result: await Todo.findByPk(req.params.id),
    message: "güncellendi",
    count: data,
  });
});

//? 4) DELETE TODO
router.delete("/:id", async (req, res) => {
  const data = await Todo.destroy({ where: { id: req.params.id } });

  // res.status(204).send({ // 204 hatası içerik vermez
  //   error: false,
  //   message: "silindi",
  //   count: data,
  // })

  if (data > 0) {
    res.sendStatus(204);
  } else {
    // kaydı tekrar silmeye çalıştığında çalışacak.
    // res.status(404).send({
    //   error: true,
    //   message: "silindi"
    // })
    res.errorStatusCode = 404;
    throw new Error(
      "errorHandler: silinecek veri bulunamadı, belki önceden silinmiştir"
    );
  }
});

module.exports = router