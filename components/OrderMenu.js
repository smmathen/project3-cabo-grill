import { useEffect, useState } from "react";
import Seo from "./Seo";

const ORDER_LIST_KEY = "@orderList";
const TOTAL_PRICE_KEY = "@totalPrice";

// THIS SHOWS THE MENU ITEMS
export default function OrderMenu({name, price}){
    //const [menuName, setName] = useState(name.replaceAll("_", " ").substr(0, name.indexOf("(")));
    //const [menuType, setType] = useState(name.substr(name.indexOf("(")));
    const [orderList, setOrderList] = useState({});
    const order = () => {
        const s = JSON.parse(window.localStorage.getItem(ORDER_LIST_KEY));

        const item =  {...orderList, [Date.now()]: {"name": name, "price": parseFloat(price)}};
        setOrderList(item);
        window.localStorage.setItem(ORDER_LIST_KEY, JSON.stringify(item));

        const p = localStorage.getItem(TOTAL_PRICE_KEY);
        if(p != null) {
            const totPrice = parseFloat(p) + parseFloat(price);
            localStorage.setItem(TOTAL_PRICE_KEY, totPrice);
        } else {
            localStorage.setItem(TOTAL_PRICE_KEY, 0.0+parseFloat(price));
        }
        window.location.reload();
    }

    const loadOrderList = () => {
        setOrderList(JSON.parse(window.localStorage.getItem(ORDER_LIST_KEY)));
    }

    useEffect(() => {
        loadOrderList();
    }, []);

    return (
        <>
            <div className="col-sm-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p>Price: ${price}</p>
                        <button onClick={order} className="btn bg-danger bg-gradient text-white">Order</button>
                    </div>
                </div>
            </div>
        </>
    );
}