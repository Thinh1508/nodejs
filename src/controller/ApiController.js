import pool from "../configs/connectDB"

let getAllUser = async (req, res) => {
  const [users, fields] = await pool.execute("select * from users")
  return res.status(200).json({ data: users })
}

let getDetailUser = async (req, res) => {
  let id = req.params.id
  if (!id) {
    return res.status(200).json({ message: `No user with id ${id}` })
  }
  const [user, fields] = await pool.execute(
    "select * from users where id = ?",
    [id]
  )
  return res.status(200).json(user)
}

let createNewUser = async (req, res) => {
  let { firstName, lastName, email, address } = req.body
  if (!firstName || !lastName || !email || !address) {
    return res.status(200).json({ message: "Missing required params" })
  }

  await pool.execute(
    "insert into users(firstName,lastName,email,address) values (?,?,?,?)",
    [firstName, lastName, email, address]
  )
  return res.status(200).json({ message: "success" })
}

let updateUser = async (req, res) => {
  let { id, firstName, lastName, email, address } = req.body
  if (!firstName || !lastName || !email || !address || !id) {
    return res.status(200).json({ message: "Missing required params" })
  }
  await pool.execute(
    `update users set firstName = ?, lastName = ?, email = ?, address = ? where id = ? `,
    [firstName, lastName, email, address, id]
  )
  return res.status(200).json({ message: "success" })
}

let deleteUser = async (req, res) => {
  let { id } = req.body
  if (!id) {
    return res.status(200).json({ message: "Missing required params" })
  }
  await pool.execute(`delete from users where id = ? `, [id])
  return res.status(200).json({ message: "success" })
}

module.exports = {
  getAllUser,
  getDetailUser,
  createNewUser,
  updateUser,
  deleteUser,
}
