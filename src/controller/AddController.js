import pool from "../configs/connectDB"

let getNewUserPage = (req, res) => {
  return res.render("newUser.ejs")
}

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body
  if (
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    address.trim() !== ""
  ) {
    await pool.execute(
      "insert into users(firstName,lastName,email,address) values (?,?,?,?)",
      [firstName, lastName, email, address]
    )
    return res.redirect("/")
  }

  return res.render("newUser.ejs", { mess: true })
}

module.exports = {
  getNewUserPage,
  createNewUser,
}
