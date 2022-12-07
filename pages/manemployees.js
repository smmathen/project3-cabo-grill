import ManBar from '../components/ManBar'
import InputStaff from '../components/InputStaff'
import ListStaff from '../components/ListStaff'
/** 
 * @swagger
* manemployee:
*   get:
*     description: Displays the staff to manager
*     summary: Displays the staff to the manager
*/
export default function menu() {
    return (
        <div>
            <ManBar />
            <InputStaff />
            <ListStaff />
        </div>
    )
}