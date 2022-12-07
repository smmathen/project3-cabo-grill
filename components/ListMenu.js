//not ready
import React, { Fragment, useEffect, useState } from "react";

import EditMenu from "./EditMenu";

const ListMenu = () => {
  const [menu, setMenu] = useState([]);

  //delete menu function

  const deleteMenu = async id => {
    try {
      const deleteMenu = await fetch(`https://project3-backend.onrender.com/manMenu/${id}`, {
        method: "DELETE"
      });

      setMenu(menu.filter(menu => menu.name !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getMenu = async () => {
    try {
      const response = await fetch("https://project3-backend.onrender.com/manMenu");
      const jsonData = await response.json();

      setMenu(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  console.log(menu);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {menu.map(menu => (
            <tr key={menu.name}>
              <td>{menu.name}</td>
              {/* // added this not sure how it works */}
              <td>{menu.ingredients.join(", ")}</td> 
              <td>{menu.quantity.join(", ")}</td> 
              <td>{menu.price}</td> 
              <td> <EditMenu menu={menu} /> </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteMenu(menu.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListMenu;
