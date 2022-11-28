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
  const { pin } = req.body;
  try {
    const employee = await pool.query(
      "SELECT name, role FROM staff WHERE pin = $1;",
      [pin]
    );
    if (employee.rowCount == 0) {
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

app.post("/submitOrder", async (req, res) => {
  const { timeStamp, order, orderTaker, total } = req.body;

  // try {
  //   const employee = await pool.query(
  //     "SELECT pin FROM staff WHERE name = $1;",
  //     [orderTaker]
  //   );
  //   pin = parseInt(employee.rows[0].pin);
  // } catch (err) {
  //   console.log(err.message);
  // }

  try {
    const success = await pool.query(
      "INSERT INTO orders(tstamp, items, ordertaker, total) VALUES ($1, $2, $3, $4);",
      [timeStamp, order, orderTaker, total]
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(false);
  }
})


app.get("/menuOrder", async (req, res) => {
  try {
    const allMenu = await pool.query(
      "SELECT name, price FROM menu"
    );
    res.json(allMenu.rows);
  } catch (err) {
    console.log(err.message);
  }
})


const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
