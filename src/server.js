import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoute from "./route/web"
import initApiRoute from "./route/api"
require("dotenv").config()

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// test Next() function
// app.use((req, res, next) => {
//   // check => return  res.send()
//   console.log("Next() function")
//   next()
// })

// setup view engine
configViewEngine(app)

//init web route
initWebRoute(app)

//init api route
initApiRoute(app)

// handle 404  not found
app.use((req, res) => {
  return res.render("404.ejs")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
