//not ready
import React, { Fragment, useEffect, useState } from "react";

import EditInven from "./EditInven";

const ListInven = () => {
  const [inven, setInven] = useState([]);

  //delete staff function

  const deleteInven = async id => {
    try {

      const deleteInven = await fetch(`https://project3-backend.onrender.com/manInven/${inven.name}`, {

        method: "DELETE"
      });

      setInven(inven.filter(inven => inven.name !== name));
    } catch (err) {
      console.error(err.message);
    }
  };

  const getInven = async () => {
    try {

      const response = await fetch("https://project3-backend.onrender.com/manInven");

      const jsonData = await response.json();

      setInven(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getInven();
  }, []);

  console.log(inven);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Low</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {inven.map(inven => (
            <tr key={inven.name}>
              <td>{inven.name}</td>
              {/* // added this not sure how it works */}
              <td>{inven.unit}</td>
              <td>{inven.low}</td>
              <td>{inven.quantity}</td>
              <td>{inven.price}</td>
              <td> <EditInven inven={inven} /> </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteInven(inven.name)}
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

export default ListInven;
