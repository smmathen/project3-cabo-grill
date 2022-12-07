
import ManBar from '../components/ManBar'
import React, { Fragment, useEffect, useState } from "react";
import RestockItem from "../components/RestockItem";
import Seo from "../components/Seo";


const RestockReport = () => {
    const [report, setReport] = useState([]);

    const getReport = async () => {
        try {
            //   console.log("howdy");
            const response = await fetch("https://project3-backend.onrender.com/restockReport");
            const jsonData = await response.json();
            setReport(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getReport();
    }, []);

    return (
        <Fragment>
            <ManBar />
            {" "}
            <Seo />
            <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

                <table className="table mt-0 border-separate text-center">
                    <ul className="list-group list-group-horizontal-xl">
                        <button className="col-2 themed-grid-col">Name</button>
                        <button className="col-2 themed-grid-col">Units</button>
                        <button className="col-2 themed-grid-col">Current Quantity</button>
                        <button className="col-2 themed-grid-col">Low Value</button>
                        <button className="col-2 themed-grid-col">Price</button>

                    </ul>
                    <tbody>

                        {report.map((inv) => (
                            <RestockItem
                                key={inv.name}
                                name={inv.name}
                                unit={inv.unit}
                                quantity={inv.quantity}
                                low={inv.low}
                                price={inv.price}
                            ></RestockItem>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
};

export default RestockReport;

