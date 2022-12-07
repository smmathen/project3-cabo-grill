import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "../styles/NavBar.module.css";

const STORAGE_KEY = "@user";
const STORAGE_PINKEY = "@pin";
const ORDER_LIST_KEY = "@orderList";
const TOTAL_PRICE_KEY = "@totalPrice";

/** 
 * @swagger
* ManBar:
*   post:
*     description: A manager only nav bar
*     summary: A manager-only nav bar
*/
export default function ManBar() {
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_PINKEY);
        localStorage.removeItem(ORDER_LIST_KEY);
        localStorage.removeItem(TOTAL_PRICE_KEY);
        router.push("/auth");
    }
    return (
        <nav>
            <div className={styles.container}>


                <Link href="/manager" className={router.pathname === "/manager" ? styles.active : styles.navBtn}>

                    Manager Home
                </Link>
                <Link href="/manmenu" className={router.pathname === "/manmenu" ? styles.active : styles.navBtn}>
                    Menu
                </Link>
                <Link href="/manemployees" className={router.pathname === "/manemployees" ? styles.active : styles.navBtn}>
                    Employees
                </Link>
                <Link href="/maninventory" className={router.pathname === "/maninventory" ? styles.active : styles.navBtn}>
                    Inventory
                </Link>
                <Link href="/mantrends" className={router.pathname === "/mantrends" ? styles.active : styles.navBtn}>

                    Restock
                </Link>
                <Link href="/salesreport" className={router.pathname === "/salesreport" ? styles.active : styles.navBtn}>
                    Sales

                </Link>
                <Link href="/excessreport" className={router.pathname === "/excessreport" ? styles.active : styles.navBtn}>
                    Excess
                </Link>
                <Link href="/staffreport" className={router.pathname === "/staffreport" ? styles.active : styles.navBtn}>
                    Staff
                </Link>
                <Link href="/manserver" className={router.pathname === "/manserver" ? styles.active : styles.navBtn}>
                    Take Order
                </Link>
                <Link href="#" onClick={logout} className={styles.navBtn}>Logout</Link>
            </div>
            <style jsx>{`
                nav {
                    margin: 5rem 0;
                    text-align: center;
                    padding-left: 15px;
                }
                img {
                    height: 14vh
                }
            `}
            </style>
        </nav>
    )
}