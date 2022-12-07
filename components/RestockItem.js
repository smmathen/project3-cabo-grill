/** 
 * @swagger
* RestockItem:
*   put:
*     description: Shows the restock report
*     summary: Shows the restock report
*   parameters:
*      - name: name
*        description: Name of item
*      - name: unit
*        description: units of the item
*      - name: quantity
*        description: quantity of the item
*      - name: low
*        description: the value considered low of the item
*      - name: price
*        description: price of the item
*/
export default function RestockItem({ name, unit, quantity, low, price }) {
    return (
        <ul className="list-group list-group-horizontal-xl">
            <button className="col-2 themed-grid-col">{name}</button>
            <button className="col-2 themed-grid-col">{unit}</button>
            <button className="col-2 themed-grid-col">{quantity}</button>
            <button className="col-2 themed-grid-col">{low}</button>
            <button className="col-2 themed-grid-col">{price}</button>
        </ul>
    );
}