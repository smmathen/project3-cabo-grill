const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// Routes
// get all menu items
app.get("/menuUser", async (req, res) => {
  try {
    const allMenu = await pool.query(
      "SELECT name, ingredients, price FROM menu"
    );
    res.json(allMenu.rows);
    // console.log("Getting into menu");
    // res.json("howdy");
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/userAuth", async (req, res) => {
  const {pin} = req.body;
  try {
    const employee = await pool.query(
      "SELECT name FROM staff WHERE pin = $1;",
      [pin]
      );
    if(employee.rowCount == 0) {
      const msg = {
        success: false,
        employee_info: [null]
      }
      res.status(500).send(msg);

    } else {
      const msg = {
        success: true,
        employee_info: employee.rows
      }
      res.status(200).send(msg);
    }
  } catch (err) {
    console.log(err.message);
  }
})


app.listen(3001, () => {
  console.log(`Server has started on port 3001`);
});
