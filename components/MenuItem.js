/**
 * @swagger
 * MenuItem:
 *   post:
 *     summary: Takes a name, list of ingredients, and price to format a single menu item in HTML.   
 *     parameters:
 *      - name: name
 *        description: name of menu item
 *      - name: ingredients
 *        description: list of ingredients
 *      - name: price
 *        descript: prie of menu item
 */
export default function MenuItem({ name, ingredients, price }) {
  console.log({ ingredients });

  return (
    <ul className="list-group list-group-horizontal-xl">
      <li className="list-group-item">{name}</li>

      <li className="list-group-item">{ingredients.join(", ")}</li>
      <li className="list-group-item">{price}</li>
    </ul>
  );
}
