import NavBar from "../components/NavBar"
import ManBar from "../components/ManBar"


const STORAGE_KEY = "@user";

export default function Layout({children}) {
    // const s = localStorage.getItem(STORAGE_KEY);
    // const userInfo = JSON.parse(s);
    // if (userInfo["role"] == 'Manager'){
    //     return (
    //         <>
    //             <ManBar/>
    //             <NavBar/>
    //             <div>{children}</div>
    //         </>
    //     )

    // }
    return (
        <>
            
            <NavBar/>
            <div>{children}</div>
        </>
    )
}