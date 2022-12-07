import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import styles from "../styles/login.module.css";

/** 
 * @swagger
* Login:
*   post:
*     description: Allows an authorized user to log in
*     summary: Allows an authorized user to log in
*/
export default function Login() {
    const [user, setUser] = useState("");
    const [auth, setAuth] = useState(false);
    const [pinNum, setPinNum] = useState("");
    const authUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://project3-backend.onrender.com/userAuth", {
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
                        setAuth(true);
                        console.log("Welcome!");
                    } else {
                        console.log("Auth failed!")
                        alert("Wrong PIN number!!!");
                    }
                });

        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <>
            <Seo title="Login" />
            <div className={styles.login}>
                <div className={styles.loginWrapper}>
                    <div className={styles.loginLeft}>
                        <img src="logo.jpeg" className={styles.loginLogo} placeholder="logo" alt="another logo for cabo" />
                        <span className={styles.loginDesc}>Hola amigos! Join our team! <p className={styles.hashTag}>#justcabo</p></span>
                    </div>
                    <div className={styles.loginRight}>
                        <div className={auth ? styles.welcomeText : styles.hidden}>Welcome {user}!</div>
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
