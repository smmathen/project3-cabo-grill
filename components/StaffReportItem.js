/** 
 * @swagger
* StaffReportItem:
*   put:
*     description: Allows a manager to view the Staff Report
*     summary: Allows a manager to view the Staff Report
*   parameters:
*      - name: name
*        description: name of staff
*      - name: count
*        description: amount of orders places
*/
export default function StaffReportItem({ name, count }) {
    return (
        <li>
            <button className="col-2 themed-grid-col">{name}</button>
            <button className="col-2 themed-grid-col">{count}</button>
        </li>
    );
}