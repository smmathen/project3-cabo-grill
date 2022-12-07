
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    info: {
      title: 'Cabo Grill Website - Team 17',
      version: '1.0.0',
      description: "Website designed for Cabo Grill customers, servers, and managers."
    }
  },
  apis: ['server.js', "components/*", "pages/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// middleware
app.use(cors());
app.use(express.json());

/**
 * @swagger
 * /menuUser:
 *   get:
 *     summary: Gets name, ingredients, and price from the menu table in the database. Populates webpage as a json object.
 *      
 */
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

/**
 * @swagger
 * /restockReport:
 *   get:
 *     summary: Queries database for items for the restock report. Returns data as a json object
 *      
 */
app.get("/restockReport", async (req, res) => {
  try {
    const report = await pool.query("SELECT * FROM inventory WHERE quantity < low");
    res.json(report.rows);
  } catch (err) {
    console.log(err.message);
  }
});


app.get("/excessReport", async (req, res) => {
  const { time } = req.body;
  try {
    const report = await pool.query("Select * from orders where tstamp >= $1;",
      [time]
    );

    if (report.rowCount == 0) {
      const msg = {
        success: false,
        list: [null]
      }
      res.status(500).send(msg);

    } else {
      const msg = {
        success: true,
        list: employee.rows
      }
      res.status(200).send(msg);
    }
  } catch (err) {
    console.log(err.message);
  }
})

app.post("/salesReport", async (req, res) => {

  try {
    const { startDate, endDate } = req.body;
    const report = await pool.query(
      "SELECT items FROM Orders WHERE tstamp >=$1 AND tstamp<=$2;", [startDate, endDate]);
    if (report.rowCount == 0) {
      const msg = {
        success: false,
        orders: [null]
      }
      res.status(500).send(msg)
    } else {
      const msg = {
        success: true,
        orders: report.rows
      }
      res.status(200).send(msg);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/staffReport", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const report = await pool.query(
      "SELECT s.name, count(orderTaker) AS order_count FROM Orders o JOIN Staff s ON s.pin = o.ordertaker WHERE tstamp >=$1 AND tstamp<=$2 GROUP BY s.name ORDER BY order_count DESC LIMIT 3;", [startDate, endDate]);
    if (report.rowCount == 0) {
      const msg = {
        success: false,
        staff_info: [null]
      }
      res.status(500).send(msg);
    } else {
      const msg = {
        success: true,
        staff_info: report.rows
      }
      res.status(200).send(msg);
    }
  } catch (err) {
    console.log(err.message);
  }
})



/**
 * @swagger
 * /userAuth:
 *   post:
 *     summary: Queries database for an employee based on user input.
 *     parameters:
 *      - name: req
 *        description: Request body with information from user's input
 *      - name: res
 *        description: Response body with information after authenticating user
 *      
 */
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

/**
 * @swagger
 * /menuOrder:
 *   get:
 *     summary: Queries database for name and price of the all menu items.
 *     parameters:
 *      - name: res
 *        description: Response body with information after returning from database, sent as a JSON
 *      
 */
app.get("/menuOrder", async (req, res) => {
  try {
    const allMenu = await pool.query(
      "SELECT name, price FROM menu;"
    );
    res.json(allMenu.rows);
  } catch (err) {
    console.log(err.message);
  }
})
//Inven members ROUTES

//create a inven member
//this one might work but probally doesn't
/**
 * @swagger
 * /manInven:
 *   post:
 *     summary: Inserts a new employee into the database.
 *     parameters:
 *      - name: req
 *        description: Request body with information from manager's input, contains the name, role, and pin of new employee.
 *      - name: res
 *        description: Response body with reponse back from database after input is successful.
 *      
 */
app.post("/manInven", async (req, res) => {
  try {
    console.log(req.body);
    const { name, unit, quantity, low, price } = req.body;
    const newInven = await pool.query(
      "INSERT INTO inventory(name,unit,quantity,low,price) VALUES ($1,$2,$3,$4,$5) Returning * ;", [name, unit, quantity, low, price]
    );
    console.log(req.body);
    res.json(newInven.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//delete a inven member
/**
 * @swagger
 * /manInven/:id:
 *   delete:
 *     summary: Deletes an employee from the database after user is inputted by manager.
 *     parameters:
 *      - name: req
 *        description: Request body with information from user's input
 *      - name: res
 *        description: Response body with string as a JSON that confirms that the employee has been removed.
 *      
 */
app.delete("/manInven/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteInven = await pool.query(
      "DELETE FROM inventory where name = $1;", [id]
    );
    res.json("Inven Member Removed");
  } catch (err) {
    console.log(err.message);
  }
})


//get all Inven
/**
 * @swagger
 * /manInven:
 *   get:
 *     summary: Gets all inven members from the database.
 *     parameters:
 *      - name: res
 *        description: Response body with all inven members returned as an Object
 *      
 */
app.get("/manInven", async (req, res) => {
  try {

    const allInven = await pool.query(
      "SELECT * FROM inventory;"
    );
    console.log(req.body);
    res.json(allInven.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//get 1 inven
/**
 * @swagger
 * /manInven/:id:
 *   get:
 *     summary: Queries database for a single employee based on an input from the user.
 *     parameters:
 *      - name: req
 *        description: Request body with the pin number of the employee being searched for
 *      - name: res
 *        description: Response body with information from the employee being returned
 *      
 */
app.get("/manInven/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const allInven = await pool.query(
      "SELECT * FROM inventory where name  = $1;", [id]
    );
    res.json(allInven.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//TODO update 1 inven
/**
 * @swagger
 * /manInven/:id:
 *   put:
 *     summary: Updates employee information based on if the manager chooses to edit one.
 *     parameters:
 *      - name: req
 *        description: Request body with new name, role, and pin for set manager. Also contains previous pin to search for user.
 *      - name: res
 *        description: Response if inven member was successfully updated
 *      
 */
app.put("/manInven/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit, quantity, low, price } = req.body;
    const updateInven = await pool.query(
      "UPDATE inventory SET name=$1, unit = $2, quantity = $3, low = $4, price = $5 WHERE name = $6;", [name, unit, quantity, low, price, id]
    );
    res.json("Inven member was updated");
  } catch (err) {
    console.log(err.message);
  }
})


//Staff members ROUTES

//create a staff member
//this one might work but probally doesn't
/**
 * @swagger
 * /manStaff:
 *   post:
 *     summary: Inserts a new employee into the database.
 *     parameters:
 *      - name: req
 *        description: Request body with information from manager's input, contains the name, role, and pin of new employee.
 *      - name: res
 *        description: Response body with reponse back from database after input is successful.
 *      
 */
app.post("/manStaff", async (req, res) => {
  try {
    console.log(req.body);
    const { name, role, pin } = req.body;
    const newStaff = await pool.query(
      "INSERT INTO staff(name,role,pin) VALUES ($1,$2,$3) Returning * ;", [name, role, pin]
    );
    console.log(req.body);
    res.json(newStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//delete a staff member
/**
 * @swagger
 * /manStaff/:id:
 *   delete:
 *     summary: Deletes an employee from the database after user is inputted by manager.
 *     parameters:
 *      - name: req
 *        description: Request body with information from user's input
 *      - name: res
 *        description: Response body with string as a JSON that confirms that the employee has been removed.
 *      
 */
app.delete("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStaff = await pool.query(
      "DELETE FROM staff where pin = $1;", [id]
    );
    res.json("Staff Member Removed");
  } catch (err) {
    console.log(err.message);
  }
})


//get all Staff
/**
 * @swagger
 * /manStaff:
 *   get:
 *     summary: Gets all staff members from the database.
 *     parameters:
 *      - name: res
 *        description: Response body with all staff members returned as an Object
 *      
 */
app.get("/manStaff", async (req, res) => {
  try {

    const allStaff = await pool.query(
      "SELECT * FROM staff;"
    );
    console.log(req.body);
    res.json(allStaff.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//get 1 staff
/**
 * @swagger
 * /manStaff/:id:
 *   get:
 *     summary: Queries database for a single employee based on an input from the user.
 *     parameters:
 *      - name: req
 *        description: Request body with the pin number of the employee being searched for
 *      - name: res
 *        description: Response body with information from the employee being returned
 *      
 */
app.get("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const allStaff = await pool.query(
      "SELECT * FROM staff where pin  = $1;", [id]
    );
    res.json(allStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//TODO update 1 staff
/**
 * @swagger
 * /manStaff/:id:
 *   put:
 *     summary: Updates employee information based on if the manager chooses to edit one.
 *     parameters:
 *      - name: req
 *        description: Request body with new name, role, and pin for set manager. Also contains previous pin to search for user.
 *      - name: res
 *        description: Response if staff member was successfully updated
 *      
 */
app.put("/manStaff/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, pin } = req.body;
    const updateStaff = await pool.query(
      "UPDATE staff SET name=$1, role = $2 WHERE pin = $3;", [name, role, pin]
    );
    res.json("Staff member was updated");
  } catch (err) {
    console.log(err.message);
  }
})

//Menu item ROUTES

//create a menu item
/**
 * @swagger
 * /manMenu:
 *   post:
 *     summary: Inserts a new item into the menu
 *     parameters:
 *      - name: req
 *        description: Request body with information about the menu items name, ingredients, quantity, and price
 *      - name: res
 *        description: response with the new menu item
 *      
 */
app.post("/manMenu", async (req, res) => {
  try {
    console.log(req.body);
    let { name, ing, qua, pri } = req.body;
    console.log(ing)
    try { ing = ing.split(",") } catch (err) { console.log(err.message); }
    try { qua = qua.split(",") } catch (err) { }
    console.log(ing)
    const newStaff = await pool.query(
      "INSERT INTO menu(name,ingredients,quantity,price) VALUES ($1,$2,$3,$4) Returning * ;", [name, ing, qua, pri]
    );
    console.log(req.body);
    res.json(newStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//delete a menu item
/**
 * @swagger
 * /manMenu:
 *   delete:
 *     summary: Deletes a menu item from the database.
 *     parameters:
 *      - name: req
 *        description: Request paramater with menu item's name
 *      - name: res
 *        description: Confirmation that the response was removed
 *      
 */
app.delete("/manMenu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStaff = await pool.query(
      "DELETE FROM menu where name = $1;", [id]
    );
    res.json("Menu Item Removed");
  } catch (err) {
    console.log(err.message);
  }
})


//get all menu items
/**
 * @swagger
 * /manMenu:
 *   get:
 *     summary: Gets all items from menu table in database.
 *     parameters:
 *      - name: req
 *        description: Request body with information from user's input
 *      - name: res
 *        description: Response body with all information stored in JSON file
 *      
 */
app.get("/manMenu", async (req, res) => {
  try {

    const allStaff = await pool.query(
      "SELECT * FROM menu;"
    );
    console.log(req.body);
    res.json(allStaff.rows);
  } catch (err) {
    console.log(err.message);
  }
})

//get 1 menu item
/**
 * @swagger
 * /manMenu/:id:
 *   post:
 *     summary: Selects all instances of a single menu item from the menu
 *     parameters:
 *      - name: req
 *        description: Request parameters with menu items name
 *      - name: res
 *        description: Response of confirmation of menu item
 *      
 */
app.get("/manMenu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const allStaff = await pool.query(
      "SELECT * FROM menu where name  = $1;", [id]
    );
    res.json(allStaff.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
})

//udpate 1 menu item
/**
 * @swagger
 * /manMenu/:id:
 *   put:
 *     summary: Updates a menu item if manager attempts to do so.
 *     parameters:
 *      - name: req
 *        description: Request body with information about menu items name, ingredients, quantity, and price.
 *      - name: res
 *        description: Response body with confirmation that new item was added
 *      
 */
app.put("/manMenu/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let { name, ing, qua, pri } = req.body;
    console.log(ing)
    try { ing = ing.split(",") } catch (err) { }
    try { qua = qua.split(",") } catch (err) { }


    const updateStaff = await pool.query(
      "UPDATE menu SET name=$1, ingredients = $2, quantity = $3, price = $4 WHERE name = $5;", [name, ing, qua, pri, id]
    );
    res.json("Menu item was updated");
  } catch (err) {
    console.log(err.message);
  }
})

/**
 * @swagger
 * /submitOrder:
 *   post:
 *     summary: Sumbits an order when a user or server submits it in the frontend
 *     parameters:
 *      - name: req
 *        description: Request body with timestamp, order, ordert taker, and price of order.
 *      - name: res
 *        description: Response if order was successfully inputted.
 *      
 */
app.post("/submitOrder", async (req, res) => {
  const { timeStamp, order, orderTaker, total } = req.body;
  let pin = 0;
  try {
    const employee = await pool.query(
      "SELECT pin FROM staff WHERE name = $1;",
      [orderTaker]
    );
    pin = parseInt(employee.rows[0].pin);
  } catch (err) {
    console.log(err.message);
  }

  try {
    const success = await pool.query(
      "INSERT INTO orders(tstamp, items, ordertaker, total) VALUES ($1, $2, $3, $4);",
      [timeStamp, order, pin, total]
    );
    res.status(200).send(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(false);
  }
})


const port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});