
import { useState } from "react";
import ManBar from "../components/ManBar";
import Seo from "../components/Seo";

export default function excessreport() {
    const [time, setTime] = useState();
    const getExcessReport = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3001/excessReport`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"time": time})
            })
            .then(response => response.json())
            .then(response => {
                if (response["success"]) {
                    alert("yay");
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
            
            {" "}
            <Seo />
            
            <h1>Date : </h1>
            <input type={"date"} onChange={e => setTime(e.target.value)}></input>
            <div className='dates-submit-button'>
                <button type='button' className='btn btn-warning' onClick={e => getExcessReport}>Get Report</button>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            </div>
        </>
    );
}