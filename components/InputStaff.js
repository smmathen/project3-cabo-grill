//not ready
import React, { Fragment, useState } from "react";

/** 
 * @swagger
* InputStaff:
*   put:
*     description: Allows a manager to input a new staff member
*     summary: Allows a manager to input a new staff member
*/
const InputStaff = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [pin, setPin] = useState("");

  /** 
 * @swagger
* onSubmitForm:
*   put:
*     description: Allows a manager to get the staff from the database on click
*     summary: Allows a manager to get teh staff from the database on click
*/
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, role, pin };

      const response = await fetch("https://project3-backend.onrender.com/manStaff", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);

      window.location = "/manemployees";

    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Employees</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={name}
          placeholder="Set Name"
          onChange={e => setName(e.target.value)}
        />


        <input
          type="text"
          className="form-control"
          value={role}
          placeholder="Set Role"
          onChange={e => setRole(e.target.value)}
        />

        <input

          type="text"
          className="form-control"
          value={pin}
          placeholder="Set Pin"
          onChange={e => setPin(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>

    </Fragment>
  );
};

export default InputStaff;
