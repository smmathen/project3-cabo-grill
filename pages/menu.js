
import React, { Fragment, useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import Seo from "../components/Seo";
// const Pool = require("pg").Pool;
// const dotenv = require("dotenv").config();

// const pool = new Pool({
//   user: process.env.PSQL_USER,
//   host: process.env.PSQL_HOST,
//   database: process.env.PSQL_DATABASE,
//   password: process.env.PSQL_PASSWORD,
//   port: process.env.PSQL_PORT,
//   ssl: { rejectUnauthorized: false },
// });

// const getMenu = () => {
//   return new Promise(function (resolve, reject) {
//     pool.query(
//       "SELECT name, ingredients, price FROM menu",
//       (error, results) => {
//         if (error) {
//           reject(error);
//         }
//         resolve(results.rows);
//       }
//     );
//   });
// };

const Menu = () => {
  const [menuUser, setMenuUser] = useState([]);

  const getMenuUser = async () => {
    try {
      //   console.log("howdy");
      const response = await fetch("http://localhost:3001/menuUser");
      const jsonData = await response.json();
      setMenuUser(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getMenuUser();
  }, []);

  return (
    <Fragment>
      {" "}
      <Seo/>
      <ul className="list-group list-group-horizontal-xl">
        <li className="list-group-item">Name</li>
        <li className="list-group-item">Ingredients</li>
        <li className="list-group-item">Price</li>
      </ul>
      <table className="table mt-5 border-separate p-8 text-center">
        <tbody>
          {/*
            <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {menuUser.map((menu) => (
            <MenuItem
              key={menu.name}
              name={menu.name}
              ingredients={menu.ingredients}
              price={menu.price}
            ></MenuItem>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Menu;

