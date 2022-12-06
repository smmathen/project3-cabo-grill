import React, { Fragment, useEffect, useState } from "react";
import Seo from '../components/Seo';
import styles from "../styles/serverui.module.css";
import OrderMenu from '../components/OrderMenu';

const ORDER_LIST_KEY = "@orderList";
const TOTAL_PRICE_KEY = "@totalPrice";
const USER_KEY = "@user";
const STORAGE_PINKEY = "@pin";

/**
* @swagger
* userUI:
*   post:
*     description: Shows menu screen for user
*     summary: Shows menu and allows user to order on a screen
*/
const serverui = () => {
  const [menuOrder, setMenuOrder] = useState([]);
  const [orderList, setOrderList] = useState({});
  const [totalPrice, setTotalPrice] = useState(0.0);

  /**
* @swagger
* loadOrderList:
*   get:
*     description: Gets order from local storage is there
*     summary: Gest order from local storage if it exists
*/
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

  /**
* @swagger
* deleteOrder:
*   delete:
*     description: Clears single item from order if user chooses to 
*     summary: Clears single item order
*   parameters:
*      - name: item
*        description: name of item being removed
*/
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

  /**
* @swagger
* clearList:
*   put:
*     description: Clears entire order if user chooses to 
*     summary: Clears all items off of an order
*/
  const clearList = () => {
    localStorage.removeItem(TOTAL_PRICE_KEY);
    localStorage.removeItem(ORDER_LIST_KEY);
    window.location.reload();
  };

  /**
* @swagger
* submitOrder:
*   post:
*     description: submits an order when the user click the submit button
*     summary: Submits order on user click
*/
  const submitOrder = async () => {
    const timeStamp = new Date(Date.now()).toISOString();
    let orderArr = [];
    for (const key in orderList) {
      orderArr.push(orderList[key].name);
    }
    const orderData = "{" + orderArr.join(", ") + "}";
    const orderTaker = parseInt(JSON.parse(localStorage.getItem(STORAGE_PINKEY)));

    try {
      const response = await fetch("https://project3-backend.onrender.com/submitOrder", {
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

  /**
* @swagger
* getMenuOrder:
*   get:
*     description: Gets the order items from the database to display to user
*     summary: Gets the order items from teh database to display to the user
*   parameters:
*      - name: item
*        description: name of item being removed
*/
  const getMenuOrder = async () => {
    try {
      //   console.log("howdy");
      const response = await fetch("https://project3-backend.onrender.com/menuOrder");
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

export default serverui;

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
