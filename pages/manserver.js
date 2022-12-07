import ManBar from '../components/ManBar';
import Userui from "../components/Userui"

export default function menu() {
    return (
        <div>
            <ManBar />
            Manager version of server
            <Userui />
        </div>
    )
}