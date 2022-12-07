import ManBar from '../components/ManBar'
import InputMenu from '../components/InputMenu'
import ListMenu from '../components/ListMenu'
/** 
 * @swagger
* manmenu:
*   get:
*     description: Displays the menu to manager
*     summary: Displays the menu to the manager
*/
export default function menu() {
    return (
        <div>
            <ManBar />
            <InputMenu />
            <ListMenu />
        </div>
    )
}
