"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express")
const app = express()

require("dotenv").config()
const PORT = process.env.PORT || 8000

app.use(express.json()) // json datayı kabul eder ve nesneye(obje) dönüştürür.

app.all("/", (req,res) => {
    res.send("Welcome to Todo API")
})




app.listen(PORT,console.log("running: http://127.0.0.1:" + PORT))
