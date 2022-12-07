import ManBar from '../components/ManBar'
import React, { Fragment, useEffect, useState } from "react";
import StaffReportItem from "../components/StaffReportItem";
import Seo from "../components/Seo";


/** 
 * @swagger
* StaffReport:
*   get:
*     description: Displays the staff report to manager
*     summary: Displays the staff report to the manager
*/
const StaffReport = () => {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [staff1, setStaff1] = useState([]);
    const [staff2, setStaff2] = useState([]);
    const [staff3, setStaff3] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [staff, setStaff] = useState([])

    /** 
     * @swagger
    * getStaffReport:
    *   get:
    *     description: Displays the staff report to manager
    *     summary: Displays the staff report to the manager
    */
    const getStaffReport = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://project3-backend.onrender.com/staffReport", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "startDate": startDate, "endDate": endDate })
            })
                .then(response => response.json())
                .then(response => {
                    if (response["success"]) {
                        const person1 = [response["staff_info"][0].name, response["staff_info"][0].order_count]
                        const person2 = [response["staff_info"][1].name, response["staff_info"][1].order_count]
                        const person3 = [response["staff_info"][2].name, response["staff_info"][2].order_count]
                        setStaff([person1, person2, person3]);
                        setLoaded(true)
                    } else {
                        alert("No Data for this time frame!")
                    }
                });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <ManBar />
            {" "}
            <Seo />
            <h1>Start Date : </h1>
            <input type={"date"} onChange={e => setStartDate(e.target.value)}></input>
            <h1>End Date:</h1>
            <input type={"date"} onChange={e => setEndDate(e.target.value)}></input>
            <div className='dates-submit-button'>
                <button type='button' className='btn btn-warning' onClick={e => getStaffReport(e)}>Get Top Performing Staff</button>
            </div>

            <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <table className="table mt-0 border-separate text-center">
                    <ul>
                        <button className="col-2 themed-grid-col">Server</button>
                        <button className="col-2 themed-grid-col">Number of Orders</button>
                    </ul>
                    <tbody>
                        <ul>
                            {staff.map((person) => (
                                loaded ? <StaffReportItem key={person[0]} name={person[0]} count={person[1]} /> : <div></div>
                            ))}
                        </ul>
                    </tbody>
                </table>
            </div>
        </Fragment >

    );

};

export default StaffReport;