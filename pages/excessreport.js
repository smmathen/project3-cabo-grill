
import { useState } from "react";
import ManBar from "../components/ManBar";
import Seo from "../components/Seo";

export default function excessreport() {
    const [time, setTime] = useState();
    const [items, setItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const getExcessReport = async () => {
        try {
            const response = await fetch("https://project3-backend.onrender.com/excessReport", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "time": time })
            })
                .then(response => response.json())
                .then(response => {
                    if (response["success"]) {
                        setItems(response["items"]);
                        setLoaded(true);
                    } else {
                        alert("wrong time frame!");
                    }
                });
        } catch (err) {
            console.log(err.message);
        }
    }
    return (
        <>
            <ManBar />
            <Seo title="Excess Report" />

            <h1>Date : </h1>
            <input type={"date"} onChange={e => setTime(e.target.value)}></input>
            <div className='dates-submit-button'>
                <button type='button' className='btn btn-warning' onClick={getExcessReport}>Get Report</button>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <h1>Excess items</h1>
                <ul>
                    {items.map((item) => loaded ? <h3>{item}</h3> : <h3></h3>)}
                </ul>
            </div>
        </>
    );
}