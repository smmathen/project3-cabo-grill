import ManBar from '../components/ManBar'
import InputInven from '../components/InputInven'
import ListInven from '../components/ListInven'
/** 
 * @swagger
* maninventory:
*   get:
*     description: Displays the inventory to manager
*     summary: Displays the inventory to the manager
*/
export default function menu() {
    return (
        <div>
            Inventory
            <ManBar />
            <InputInven />
            <ListInven />
        </div>
    )
}