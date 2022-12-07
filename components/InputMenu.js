//not ready
import React, { Fragment, useState } from "react";

const InputMenu = () => {
  const [name, setName] = useState("");
  const [ing, setIng] = useState("");
  const [qua, setQua] = useState("");
  const [pri, setPri] = useState("");

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name,ing,qua,pri };
      const response = await fetch("https://project3-backend.onrender.com/manMenu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
      window.location = "/manmenu";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Menu</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={name}
          placeholder = "Set Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={ing}
          placeholder = "Set Ingredients"
          onChange={e => setIng(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={qua}
          placeholder = "Set Quantity"
          onChange={e => setQua(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={pri}
          placeholder = "Set Price"
          onChange={e => setPri(e.target.value)}
        />
        <button className="btn btn-success">Add</button>

      </form>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>

      </form>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        
      </form>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        
      </form>
      
    </Fragment>
  );
};

export default InputMenu;
