//not ready
import React, { Fragment, useState } from "react";

const InputInven = () => {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [low, setLow] = useState("");
  const [price, setPrice] = useState("");




  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { name, unit, quantity, low, price };
      const response = await fetch("https://project3-backend.onrender.com/manInven", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response);
      window.location = "/maninventory";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Inventory Items</h1>
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
          value={unit}
          placeholder="Set Unit"
          onChange={e => setUnit(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={quantity}
          placeholder="Set Quantity"
          onChange={e => setQuantity(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={low}
          placeholder="Set Low"
          onChange={e => setLow(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          value={price}
          placeholder="Set Price"
          onChange={e => setPrice(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>

    </Fragment>
  );
};

export default InputInven;
