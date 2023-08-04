import express from "express"
import multer from "multer"
import path from "path"

import {
  getHomePage,
  getDetailPage,
  deleteUser,
  getUpdateUserPage,
  updateUser,
} from "../controller/HomeController"
import { getNewUserPage, createNewUser } from "../controller/AddController"
import {
  getUploadFilePage,
  uploadFile,
  uploadFileMultiple,
} from "../controller/UploadFileController"

let router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/image")
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!"
    return cb(new Error("Only image files are allowed!"), false)
  }
  cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: imageFilter })
const uploadMultiple = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("uploadFileM", 5)

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

  // upload file
  router.get("/uploadFile", getUploadFilePage)
  router.post("/uploadFile", upload.single("uploadFile"), uploadFile)
  router.post(
    "/uploadFile-multiple",
    (req, res, next) => {
      uploadMultiple(req, res, function (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          return res.send("LIMIT_UNEXPECTED_FILE")
        } else if (err) {
          return res.send(err)
        } else {
          next()
        }
      })
    },
    uploadFileMultiple
  )

  return app.use("/", router)
}

export default initWebRoute
