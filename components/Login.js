import { useEffect, useState } from "react";
import Seo from "./Seo";
import styles from "../styles/login.module.css";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";


const STORAGE_KEY = "@user";
const STORAGE_PINKEY = "@pin";
const clientId = "163203061075-th8790psc1e625eqm27l96uiag8p3ocf.apps.googleusercontent.com";
/**
 * @swagger
 * Login:
 *   post:
 *     description: Attempts to log the user in via their credentials.
 *     summary: Returns a login page for the user and stores information in local storage if succesful
 *          
 *      
 */
export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState("null");
    const [role, setRole] = useState("guest");
    const [auth, setAuth] = useState(false);
    const [pinNum, setPinNum] = useState("");

    const authUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://project3-backend.onrender.com/userAuth", {
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

            router.push("/auth");
        } catch (error) {
            console.log(error.message);
        }
    }

    /**
     * @swagger
     * saveUser:
     *   post:
     *     description: Stores users credentials in local storage if logged in successfully.
     *     summary: Returns true if the user logs in successfully.   
     *     parameters:
     *      - name: userInfo
     *        description: contains all information about the user that needs to be stored in local storage 
     */
    const saveUser = (userInfo) => {
        const s = JSON.stringify(userInfo);
        const p = JSON.stringify(pinNum);
        localStorage.setItem(STORAGE_KEY, s);
        localStorage.setItem(STORAGE_PINKEY, p);
        setAuth(true);
    }


    /**
     * @swagger
     * saveOauthUser:
     *   put:
     *     description: stores users information in local storage once authenticated
     *     summary: stores users information in local storage once authenticated
     */
    const saveOauthUser = (userInfo) => {
        const s = JSON.stringify(userInfo);
        localStorage.setItem(STORAGE_KEY, s);
        setAuth(true);
    }

    //get all Staff
    /**
     * @swagger
     * loadUser:
     *   get:
     *     description: Gets user information if they are stored in local storage.
     *     summary: Returns true or false based on if the user exists in local storage.
     */
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


    /**
     * @swagger
     * handleCallbackResponse:
     *   put:
     *     description: Provides OAuth functionality for a user logging in
     *     summary: Pushes to authenticate a user based on their Google account.  
     *     parameters:
     *      - res: userInfo
     *        description: contains all information about the user's credentials
     */
    const handleCallbackResponse = async (res) => {

        let userObject = jwt_decode(res.credential);
        const googlePin = String(userObject.sub).substring(0,5);
        localStorage.setItem(STORAGE_PINKEY, JSON.stringify(googlePin));
        try {
            const response = await fetch("https://project3-backend.onrender.com/userAuth", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "pin": googlePin })
            })
                .then(response => response.json())
                .then(response => {
                    if (response["success"]) {
                        setUser(response["employee_info"][0]["name"]);
                        setRole(response["employee_info"][0]["role"]);
                        const loginInfo = { "name": response["employee_info"][0]["name"], "role": response["employee_info"][0]["role"] };
                        saveOauthUser(loginInfo);
                    } else {
                        alert("Auth failed!");
                    }
                });

            router.push("/auth");
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        loadUser();
        google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCallbackResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        );
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
                        <div id="signInDiv"></div>
                    </div>

                </div>
            </div>
        </>
    )
}
