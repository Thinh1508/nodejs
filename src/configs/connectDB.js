// get the client
import mysql from "mysql2"

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "nodejs",
})

// // simple query
// connection.query("SELECT * FROM `users` ", function (err, results, fields) {
//   console.log("connectDB success")
//   let rows = results.map((row) => {
//     return row
//   })
//   console.log(rows)
// })

export default connection
