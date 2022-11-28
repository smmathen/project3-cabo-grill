
import { useEffect, useState } from "react";
import Seo from "./Seo";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";

const STORAGE_KEY = "@user";
const STORAGE_PINKEY = "@pin";

export default function Login() {
    const [user, setUser] = useState("null");
    const [role, setRole] = useState("guest");
    const [auth, setAuth] = useState(false);
    const [pinNum, setPinNum] = useState("");

    const authUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/userAuth", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "pin": pinNum })
            })
                .then(response => response.json())
                .then(response => {
                    if (response["success"]) {
                        setUser(response["employee_info"][0]["name"]);
                        setRole(response["employee_info"][0]["role"]);
                        const loginInfo = { "name": response["employee_info"][0]["name"], "role": response["employee_info"][0]["role"] };
                        saveUser(loginInfo);
                    } else {
                        console.log("Auth failed!")
                        alert("Wrong PIN number!!!");
                    }
                });

        } catch (error) {
            console.log(error.message);
        }
    }

    const saveUser = (userInfo) => {
        const s = JSON.stringify(userInfo);
        const p = JSON.stringify(pinNum);
        localStorage.setItem(STORAGE_KEY, s);
        localStorage.setItem(STORAGE_PINKEY, p);
        setAuth(true);
    }

    const loadUser = () => {
        const s = localStorage.getItem(STORAGE_KEY);
        const p = localStorage.getItem(STORAGE_PINKEY);
        const userInfo = JSON.parse(s);
        if (userInfo === null) {
            setAuth(false);
        } else {
            setUser(userInfo["name"]);
            setRole(userInfo["role"]);
            setAuth(true);
        }
    }

    useEffect(() => {
        loadUser();
    }, [])

    return (
        <>
            <Seo title="Login" />
            <div className={styles.login}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginLeft}>
                        <img src="logo.jpeg" className={styles.loginLogo} placeholder="logo" />
                        <span className={styles.loginDesc}>Hola amigos! Join our team! <p className={styles.hashTag}>#justcabo</p></span>
                    </div>
                    <div className={styles.loginRight}>
                        <div className={auth ? styles.welcomeText : styles.hidden}>
                            Welcome {user}!
                        </div>
                        <form className={auth ? styles.hidden : styles.loginBox}>
                            <input className={styles.loginInput} onChange={e => setPinNum(e.currentTarget.value)} value={pinNum} placeholder="PIN Number" type="password" required={true} />
                            <button className={styles.loginButton} onClick={authUser} >Log in</button>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}
