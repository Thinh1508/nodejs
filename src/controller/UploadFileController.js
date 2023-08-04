import multer from "multer"

let getUploadFilePage = (req, res) => {
  return res.render("uploadFile.ejs")
}

const upload = multer().single("uploadFile")

let uploadFile = async (req, res) => {
  // console.log(req.file)
  upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
      return res.send(req.fileValidationError)
    } else if (!req.file) {
      return res.send("Please select an image to upload")
    } else if (err instanceof multer.MulterError) {
      return res.send(err)
    } // else if (err) {
    //   return res.send(`error ${err}`)
    // }

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/uploadFile">Upload another image</a>`
    )
  })
}

const uploadMultiple = multer().array("uploadFileM")

let uploadFileMultiple = async (req, res) => {
  if (req.fileValidationError) {
    return res.send(req.fileValidationError)
  } else if (!req.files) {
    return res.send("Please select an image to upload")
  }

  let result = "You have uploaded these images: <hr />"
  const files = req.files
  let index, len

  // Loop through all the uploaded images and display them on frontend
  for (index = 0, len = files.length; index < len; ++index) {
    console.log()
    result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`
  }
  result += '<hr/><a href="uploadFile">Upload more images</a>'
  res.send(result)
}

module.exports = {
  getUploadFilePage,
  uploadFile,
  uploadFileMultiple,
}
