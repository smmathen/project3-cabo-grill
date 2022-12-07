import ManBar from '../components/ManBar';
import Userui from "../components/Userui"

/** 
 * @swagger
* manserver:
*   get:
*     description: Displays the server screen to manager
*     summary: Displays the server screen to the manager
*/
export default function menu() {
    return (
        <div>
            <ManBar />
            Manager version of server
            <Userui />
        </div>
    )
}