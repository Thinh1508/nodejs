import connection from "../configs/connectDB"

let getHomePage = (req, res) => {
  // logic
  // simple query
  let data = []
  connection.query("SELECT * FROM `users` ", function (err, results, fields) {
    console.log("connectDB success")
    results.map((row) => {
      data.push({
        id: row.id,
        email: row.email,
        address: row.address,
        firstName: row.firstName,
        lastName: row.lastName,
      })
    })
    console.log(data)
    return res.render("index.ejs", { dataUser: data, name: "tham so thu 2" })
  })
}

module.exports = {
  getHomePage,
}
