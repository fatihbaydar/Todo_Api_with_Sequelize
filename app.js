"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // json datayı kabul eder ve nesneye(obje) dönüştürür.

require("express-async-errors"); // asenkron hatalaarı yakalayıp errorHandler'a gönderir.


/* ------------------------------------------------------- */



app.use(require("./app/routes/todo.router"));

/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler çalıştı");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cauese: err.cauese,
  });
};
app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, console.log("running: http://127.0.0.1:" + PORT));
