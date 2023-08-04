import express from "express"
import {
  getAllUser,
  getDetailUser,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controller/ApiController"

let router = express.Router()

const initApiRoute = (app) => {
  router.get("/users", getAllUser)
  router.get("/user/:id", getDetailUser)

  router.post("/user", createNewUser)

  router.put("/user", updateUser)

  router.delete("/user", deleteUser)

  return app.use("/api/v1/", router)
}

export default initApiRoute
