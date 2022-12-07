//not ready
import React, { Fragment, useState } from "react";
/**
 * @swagger
 * EditMenu:
 *   put:
 *     description: Allows a manager to edit the menu items
 *     summary: Allows a manager to edit the menu items
 *   parameters:
 *      - name: menu
 *        description: Object that holds menu items name, ingredients, quantity, and price
 */
const EditMenu = ({ menu }) => {
  //   const [description, setDescription] = useState(todo.description);
  const [name, setName] = useState(menu.name);
  const [ing, setIng] = useState(menu.ingredients);
  const [qua, setQua] = useState(menu.quantity);
  const [pri, setPri] = useState(menu.price);

  //edit description function

  /** 
   * @swagger
 * updateMenu:
 *   put:
 *     description: Allows a manager to edit a menu item
 *     summary: Allows a manager to edit a menu item

 */
  const updateMenu = async e => {
    e.preventDefault();
    try {
      const body = { name, ing, qua, pri };
      console.log(menu.name)
      const response = await fetch(
        `https://project3-backend.onrender.com/manMenu/${menu.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/manmenu";
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
        id={`id${menu.name}`}
        onClick={() => setName(menu.name)}
      >
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={menu.name}
                // value={menu.name}
                onChange={e => setName(e.target.value || menu.name)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={menu.ingredients}
                // value={menu.name}
                onChange={e => setIng(e.target.value || menu.ingredients)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={menu.quantity}
                // value={menu.name}
                onChange={e => setQua(e.target.value || menu.quantity)}
              />
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                placeholder={menu.price}
                // value={menu.name}
                onChange={e => setPri(e.target.value || menu.price)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => updateMenu(e)}
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

export default EditMenu;