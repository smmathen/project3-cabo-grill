const STORAGE_KEY = "@user";

export default function Logout() {
    const logout = () => {
        localStorage.removeItem(STORAGE_KEY);
    }
    return (
        <>
            <button onClick={logout} >Log out</button>
            <style jsx>{`
                button {
                    height: 50px;
                    margin-top: 5vh;
                    border-radius: 10px;
                    border: none;
                    background-color: red;
                    color: white;
                    font-size: 20px;
                    font-weight: 500;
                    cursor: pointer;
                }
            
            `}
            </style>
        </>
    )
}