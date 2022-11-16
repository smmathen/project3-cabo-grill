import Link from "next/link";
import Router, { useRouter } from "next/router";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {

    // Home | Menu | Login | Location
    const router = useRouter();
    return (
        <nav>
            <img className={styles.logo} src="logo.jpeg"/>
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
                <Link href="/login" className={router.pathname === "/login" ? styles.active : styles.navBtn}>
                    LOGIN
                </Link>
                <Link href="/serverui" className={router.pathname === "/serverui" ? styles.active : styles.navBtn}>
                    SERVER
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

