import React, { Fragment, useEffect, useState } from "react";
import Seo from '../components/Seo';
import styles from "../styles/serverui.module.css";
import OrderMenu from '../components/OrderMenu';

const ORDER_LIST_KEY = "@orderList";
const TOTAL_PRICE_KEY = "@totalPrice";
const USER_KEY = "@user";
const ORDER_TAKER = "00001";
const STORAGE_PINKEY = "@pin";


const Userui = () => {
    const [menuOrder, setMenuOrder] = useState([]);
    const [orderList, setOrderList] = useState({});
    const [totalPrice, setTotalPrice] = useState(0.0);

    const loadOrderList = () => {
        const s = window.localStorage.getItem(ORDER_LIST_KEY)
        if (s != null) {
            setOrderList(JSON.parse(s));
        }

        const p = localStorage.getItem(TOTAL_PRICE_KEY);
        if (p != null) {
            setTotalPrice(p);
        } else if (p < 1) {
            setTotalPrice(0.0);
        }
    };

    const deleteOrder = (e) => {
        const key = e.target.classList.value;
        const values = key.split(",");
        const newOrderList = { ...orderList };
        delete newOrderList[values[0]];
        setOrderList(newOrderList);
        window.localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(newOrderList));

        const p = localStorage.getItem(TOTAL_PRICE_KEY);
        if (p != null) {
            const totPrice = parseFloat(p) - parseFloat(values[1]);
            localStorage.setItem(TOTAL_PRICE_KEY, totPrice);
        } else {
            localStorage.setItem(TOTAL_PRICE_KEY, 0.0 + parseFloat(price));
        }
        window.location.reload();
    }

    const clearList = () => {
        localStorage.removeItem(TOTAL_PRICE_KEY);
        localStorage.removeItem(ORDER_LIST_KEY);
        window.location.reload();
    };

    const submitOrder = async () => {
        const timeStamp = new Date(Date.now()).toISOString();
        let orderArr = [];
        for (const key in orderList) {
            orderArr.push(orderList[key].name);
        }
        const orderData = "{" + orderArr.join(", ") + "}";
        const orderTaker = "";
        if (JSON.parse(localStorage.getItem(STORAGE_PINKEY)) === 0) {
            orderTaker = ORDER_TAKER;
        }
        else {
            orderTaker = JSON.parse(localStorage.getItem(STORAGE_PINKEY))
        }

        try {
            const response = await fetch("http://localhost:3001/submitOrder", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "timeStamp": timeStamp, "order": orderData, "orderTaker": orderTaker, "total": totalPrice })
            })
                .then(response => response.json())
                .then(response => {
                    if (response) {
                        clearList();
                        alert("Order Successful!");
                    } else {
                        alert("Something went wrong!");
                    }
                });
        } catch (error) {
            console.log(error.message);
        }
    }

    const getMenuOrder = async () => {
        try {
            //   console.log("howdy");
            const response = await fetch("http://localhost:3001/menuOrder");
            const jsonData = await response.json();
            setMenuOrder(jsonData);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(() => {
        getMenuOrder();
        loadOrderList();
    }, []);


    return (
        <div className="d-flex flex-row mx-5 my-5">
            <Seo title="server" />
            <div className="row">
                {menuOrder.map(menu => <OrderMenu key={menu.name} name={menu.name} price={menu.price} />)}
            </div>
            <div className="mx-3">
                <h1 className="text-nowrap">Order List</h1>
                <div className="bg-secondary bg.gradient p-3">
                    {Object.keys(orderList).map(key => <div className="d-flex flex-row"><h5 className="text-white ml-5">{orderList[key]["name"]}</h5><div key={key} onClick={deleteOrder} className={[key, orderList[key]["price"]]}>x</div></div>)}
                </div>
                <div className="d-flex flex-row align-items-end justify-content-between">
                    <div>Price: ${totalPrice}</div>
                    <button className="btn bg-danger bg-gradient text-white" onClick={submitOrder}>Order</button>
                    <button className="btn bg-danger bg-gradient text-white" onClick={clearList}>Clear All</button>
                </div>
            </div>
        </div>
    );
};
export default Userui;

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    }
}

/*

HOW TO OUPUT TO A TEXT BOX: https://www.tutorialspoint.com/how-to-output-javascript-into-a-textbox 
*/