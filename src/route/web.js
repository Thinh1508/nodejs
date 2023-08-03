import express from "express"
import {
  getHomePage,
  getDetailPage,
  deleteUser,
  getUpdateUserPage,
  updateUser,
} from "../controller/HomeController"
import { getNewUserPage, createNewUser } from "../controller/AddController"

let router = express.Router()

const initWebRoute = (app) => {
  // home
  router.get("/", getHomePage)
  router.get("/update/:userId", getUpdateUserPage)
  router.post("/update-user", updateUser)
  router.post("/delete-user", deleteUser)

  // new user
  router.get("/new", getNewUserPage)
  router.post("/create-user", createNewUser)

  // detail
  router.get("/detail/user/:userId", getDetailPage)

  return app.use("/", router)
}

export default initWebRoute
