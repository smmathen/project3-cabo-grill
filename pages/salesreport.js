import ManBar from '../components/ManBar'
import React, { Fragment, useEffect, useState } from "react";
import SalesReportItem from "../components/SalesReportItem";
import Seo from "../components/Seo";


/** 
 * @swagger
* SalesReport:
*   get:
*     description: Displays the sales report to manager
*     summary: Displays the sales report to the manager
*/
const SalesReport = () => {
    const [report, setReport] = useState([]);
    const [count_pair, setCountPair] = useState([]);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [loaded, setLoaded] = useState(false);


    const getSalesReport = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://project3-backend.onrender.com/salesReport", {
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
                        var count_map = Object();
                        const count = Object.keys(response["orders"]).length
                        for (var i = 0; i < count; i++) {
                            const order = response["orders"][i]["items"];
                            order.forEach(element => {
                                if (count_map[element]) {
                                    count_map[element] += 1;
                                } else {
                                    count_map[element] = 1
                                }
                            });
                        }
                        console.log(count_map);
                        // convert the count map to ordered array
                        const sorted = [];
                        for (var item in count_map) {
                            sorted.push([item, count_map[item]]);
                        }
                        sorted.sort(function (a, b) {
                            return b[1] - a[1];
                        });
                        console.log(sorted);
                        setCountPair(sorted);
                        setLoaded(true);

                    } else {
                        alert("No Data for this time frame!")
                    }
                });
            // window.location = "/salesreport";
        } catch (error) {
            console.log(error.message);
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
                <button type='button' className='btn btn-warning' onClick={e => getSalesReport(e)}>Get Report</button>
            </div>
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <table className="table mt-0 border-separate text-center">
                    <ul>
                        <button className="col-2 themed-grid-col">Name</button>
                        <button className="col-2 themed-grid-col">Count</button>
                    </ul>
                    <tbody>
                        <ul>
                            {count_pair.map((inv) => (
                                loaded ? <SalesReportItem key={inv[0]} name={inv[0]} count={inv[1]} /> : <div></div>
                            ))}
                        </ul>

                        {// count_pair.map((inv) => (
                            //     count_pair == null ? <div></div> :
                            //         <SalesReportItem>
                            //             key={inv[0]}
                            //             name={inv[0]}
                            //             count={inv[1]}
                            //         </SalesReportItem>
                            // ))
                        }
                    </tbody>
                </table>
            </div>
        </Fragment >
    );

    // return (
    //     <Fragment>
    //         <ManBar />
    //         {" "}
    //         <Seo />
    //         <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    //             {/* <form className="d-flex mt-5" onSubmit={onSubmitForm}>
    //                 <input
    //                     type="text"
    //                     className="form-control"
    //                     value={"role"}
    //                     placeholder="Start Time"
    //                     onChange={e => setRole(e.target.value)}
    //                 />
    //             </form> */}
    //             <table className="table mt-0 border-separate text-center">
    //                 <ul className="list-group list-group-horizontal-xl">
    //                     <button className="col-2 themed-grid-col">Name</button>
    //                     <button className="col-2 themed-grid-col">Units</button>
    //                     <button className="col-2 themed-grid-col">Price</button>
    //                 </ul>
    //                 <tbody>

    //                     {/*report.map((inv) => (
    //                             <RestockItem
    //                                 key={inv.name}
    //                                 name={inv.name}
    //                                 unit={inv.unit}
    //                                 quantity={inv.quantity}
    //                                 low={inv.low}
    //                                 price={inv.price}
    //                             ></RestockItem>
    //                         ))*/}
    //                 </tbody>
    //             </table>
    //         </div>
    //     </Fragment>
    // );
};

export default SalesReport;