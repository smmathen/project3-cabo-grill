/** 
 * @swagger
* SalesReportItem:
*   put:
*     description: Allows a manager to view the Sales Report
*     summary: Allows a manager to view the Sales Report
*   parameters:
*      - name: name
*        description: name of item on report
*      - name: count
*        description: amount of that item sold
*/
export default function SalesReportItem({ name, count }) {
    return (
        <li>
            <button className="col-2 themed-grid-col">{name}</button>
            <button className="col-2 themed-grid-col">{count}</button>
        </li>
    );
}