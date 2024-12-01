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

app.all("/", (req, res) => {
  res.send("Welcome to Todo API");
});

/* ------------------------------------------------------- */

//? SEQUELIZE
// npm i sequelize sqlite3

const { Sequelize, DataTypes } = require("sequelize");

// Bağlama
// const sequelize = new Sequelize('sqlite:./db.sqlite3')
// const sequelize = new Sequelize('sqlite:' + process.env.SQLITE)
const sequelize = new Sequelize(
  "sqlite:" + (process.env.SQLITE || "./db.sqlite3")
);

// Model
// Her model veritabanında bir tabloya karşılık gelir.
// sequelize.define("tableName", {tableDetails})
// Model isimleri PascalCase

const Todo = sequelize.define("todos", {
  //!  sequelize'da id tanımlamaya gerek yoktur. Otomatik tanımlanır.
  //   id: {
  //     type: DataTypes.INTEGER,
  //     allowNull: false, // default true --boş değerlere izin verilsin mi?
  //     unique: true, //default false
  //     comment: "description",
  //     primaryKey: true, //default false
  //     autoIncrement: true, //default false
  //     field: "custom_name",
  //     defaultValue: 0, // default: null
  //   },

  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // description: {
  //     type:DataTypes.TEXT
  // }
  description: DataTypes.TEXT, //! kısayolu: Sadece data tipi oluşturulacaksa obje açmaya gerek yok

  priority: {
    // -1: Low, 0: Normal, 1: Yüksek
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
  },

  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  // createdAt: {},
  // updatedAt: {},
  //! createdAt ve updatedAt tanımlamaya gerek yoktur. Sequelize otomatik yönetir.
});

//? Senkronizasyon
// Modeli veri tabanına uygula
// sequelize.sync(); // tablo oluşturur. Model veri tabanına uygulanmamışsa çalıştırılır.
// sequelize.sync({force:true}) // tabloyu siler ve yeniden oluşturur.
sequelize.sync({alter:true}) // tabloyu yedekler sonra siler sonra yeniden oluşturur sonra yedeklemeyi de siler.
//! sync() methodu 1 kere uygulanır (modelde değişiklik var ise tekrar uygulanır.)

/* ------------------------------------------------------- */

const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked");
  res.status(errorStatusCode).send({
    error: true,
    message: err.message,
    cauese: err.cauese,
  });
};
app.use(errorHandler);

/* ------------------------------------------------------- */
app.listen(PORT, console.log("running: http://127.0.0.1:" + PORT));
