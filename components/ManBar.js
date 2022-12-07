import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "../styles/NavBar.module.css";

export default function ManBar() {
    const router = useRouter();
    return (
        <nav>
            {/* <img className={styles.logo} src="logo.jpeg"/> */}
            <div className={styles.container}>

            
            <Link href="/manager" className={router.pathname === "/manager" ? styles.active : styles.navBtn}>

                    Manager Home
                </Link>
                <Link href="/manmenu" className={router.pathname === "/manmenu" ? styles.active : styles.navBtn}>
                    View or Edit Menu
                </Link>
                <Link href="/manemployees" className={router.pathname === "/manemployees" ? styles.active : styles.navBtn}>
                    View or Edit Employees
                </Link>
                <Link href="/maninventory" className={router.pathname === "/maninventory" ? styles.active : styles.navBtn}>
                    View or Edit Inventory
                </Link>
                <Link href="/mantrends" className={router.pathname === "/mantrends" ? styles.active : styles.navBtn}>

                    Restock Report
                </Link>
                <Link href="/salesreport" className={router.pathname === "/salesreport" ? styles.active : styles.navBtn}>
                    Sales Report

                </Link>
                <Link href="/manserver" className={router.pathname === "/manserver" ? styles.active : styles.navBtn}>
                    Take an Order
                </Link>
                <Link href="/" className={router.pathname === "/" ? styles.active : styles.navBtn}>
                    Log Out
                </Link>
            </div>
            <style jsx>{`
                nav {
                    margin: 1rem 0;
                    text-align: center;
                }
                img {
                    height: 14vh
                }
            `}
            </style>
        </nav>
    )
}