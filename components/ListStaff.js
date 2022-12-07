//not ready
import React, { Fragment, useEffect, useState } from "react";

import EditStaff from "./EditStaff";
/** 
 * @swagger
* ListStaff:
*   get:
*     description: Allows a manager to view the staff
*     summary: Allows a manager to view the staff
*/
const ListStaff = () => {
  const [staff, setStaff] = useState([]);

  //delete staff function
  /** 
   * @swagger
 * deleteStaff:
 *   delete:
 *     description: Allows a manager to delete a staff member
 *     summary: Allows a manager to delete a staff member
 *   parameters:
 *      - name: id
 *        description: pin value of the staff member to be deleted
 */
  const deleteStaff = async id => {
    try {

      const deleteStaff = await fetch(`https://project3-backend.onrender.com/manStaff/${id}`, {

        method: "DELETE"
      });

      setStaff(staff.filter(staff => staff.pin !== id));
    } catch (err) {
      console.error(err.message);
    }
  };
  /** 
   * @swagger
 * getStaff:
 *   get:
 *     description: Allows a manager to view the staff
 *     summary: Allows a manager to view the staff
 */
  const getStaff = async () => {
    try {

      const response = await fetch("https://project3-backend.onrender.com/manStaff");

      const jsonData = await response.json();

      setStaff(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStaff();
  }, []);

  console.log(staff);

  return (
    <Fragment>
      {" "}
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Pin</th>
            <th>Edit Name</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {staff.map(staff => (
            <tr key={staff.pin}>
              <td>{staff.name}</td>
              {/* // added this not sure how it works */}
              <td>{staff.role}</td>
              <td>{staff.pin}</td>
              <td> <EditStaff staff={staff} /> </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStaff(staff.pin)}
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

export default ListStaff;
