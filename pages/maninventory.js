import ManBar from '../components/ManBar'
import InputInven from '../components/InputInven'
import ListInven from '../components/ListInven'
export default function menu() {
    return (
        <div>
            Inventory
            <ManBar/>
            <InputInven/>
            <ListInven/>
        </div>
    )
}