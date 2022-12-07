import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "../styles/NavBar.module.css";
import Translate from "../pages/translate";

/**
 * @swagger
 * NavBar:
 *   post:
 *     description: Creates a navbar for all users to see.
 *     summary: Creates a navbar for all users to see.   
 */
export default function NavBar() {

    // Home | Menu | Login | Location
    const router = useRouter();
    return (
        <nav>
            <img className={styles.logo} src="logo.jpeg" />
            <div className={styles.container}>
                <Link href="/" className={router.pathname === "/" ? styles.active : styles.navBtn}>
                    HOME
                </Link>

                <Link href="/menu" className={router.pathname === "/menu" ? styles.active : styles.navBtn}>
                    MENU
                </Link>

                <Link href="/location" className={router.pathname === "/location" ? styles.active : styles.navBtn}>
                    LOCATION
                </Link>

                <Link href="/auth" className={router.pathname === "/auth" ? styles.active : styles.navBtn}>
                    EMPLOYEE
                </Link>
                <Link href="/manager" className={router.pathname === "/manager" ? styles.active : styles.navBtn}>
                    MANAGER
                </Link>

                <Translate />
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

