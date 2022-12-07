//not ready
import React, { Fragment, useState } from "react";

const EditStaff = ({ staff }) => {
//   const [description, setDescription] = useState(todo.description);
  const [name, setName] = useState(staff.name);
  const [role, setRole] = useState(staff.role);
  const [pin, setPin] = useState(staff.pin);

  //edit description function


  const updateStaff = async e => {
    e.preventDefault();
    try {
        const body = { name,role,pin };
      const response = await fetch(

        `https://project3-backend.onrender.com/manStaff/${staff.pin}`,

        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );


      window.location = "/manemployees";

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
        id={`id${staff.pin}`}
        onClick={() => setName(staff.name)}
      >
        <div class="modal-dialog">
          <div class="modal-content">

            {/* <div class="modal-header">
              <h4 class="modal-title">Edit Staff</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setName(staff.name)}
              >
                &times;
              </button>
            </div> */}

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {staff.name}
                // value={staff.name}
                onChange={e => setName(e.target.value)}
              />
            </div>


            {/* <div class="modal-footer">

              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"

                onClick={e => updateStaff(e)}
              >
                Edit Name
              </button>
            </div> */}


            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {staff.role}
                // value={staff.name}
                onChange={e => setRole(e.target.value)}
              />
            </div>


            {/* <div class="modal-footer">

              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"

                onClick={e => updateStaff(e)}
              >
                Edit Role
              </button>
            </div> */}

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder = {staff.pin}
                // value={staff.name}
                onChange={e => setPin(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateStaff(e)}
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

export default EditStaff;