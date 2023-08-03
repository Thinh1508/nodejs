import pool from "../configs/connectDB"

let getHomePage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM USERS")
  return res.render("index.ejs", { dataUser: rows, name: "tham so thu 2" })
}

let getDetailPage = async (req, res) => {
  let userId = req.params.userId
  let user = await pool.execute(`select * from users where id = ?`, [userId])
  return res.send(user[0])
}

let getUpdateUserPage = async (req, res) => {
  let userId = req.params.userId
  let [user] = await pool.execute(`select * from users where id = ?`, [userId])
  return res.render("updateUser.ejs", { dataUser: user[0] })
}

let updateUser = async (req, res) => {
  let { id, firstName, lastName, email, address } = req.body
  await pool.execute(
    `update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ? `,
    [firstName, lastName, email, address, id]
  )
  return res.redirect("/")
  // return res.send(`update ${id}`)
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId
  await pool.execute(`delete from users where id = ?`, [userId])
  return res.redirect("/")
}

module.exports = {
  getHomePage,
  getDetailPage,
  deleteUser,
  getUpdateUserPage,
  updateUser,
}
