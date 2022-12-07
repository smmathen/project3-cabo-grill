//not readypin
import React, { Fragment, useState } from "react";

const EditInven = ({ inven }) => {
//   const [description, setDescription] = useState(todo.description);
  const [name, setName] = useState(inven.name);
  const [unit, setUnit] = useState(inven.unit);
  const [quantity, setQuantity] = useState(inven.quantity);
  const [low, setLow] = useState(inven.low);
  const [price, setPrice] = useState(inven.price);
  

  //edit description function

  const updateInven = async e => {
    e.preventDefault();
    try {
        const body = { name,unit,quantity,low,price };
      const response = await fetch(
        `https://project3-backend.onrender.com/manInven/${inven.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/maninventory";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${inven.name}`}
        onClick={() => setName(inven.name)}
      >
        <div class="modal-dialog">
          <div class="modal-content">


            
          <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {inven.name}
                // value={inven.unit}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {inven.unit}
                // value={inven.unit}
                onChange={e => setUnit(e.target.value)}
              />
            </div>



            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {inven.quantity}
                // value={inven.unit}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {low.quantity}
                // value={inven.unit}
                onChange={e => setLow(e.target.value)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {price.quantity}
                // value={inven.unit}
                onChange={e => setPrice(e.target.value)}
              />
            </div>




            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateInven(e)}
              >
                Edit
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditInven;