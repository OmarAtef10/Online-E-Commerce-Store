import React, {useEffect, useState} from "react";
import Base from "../core/base";
import {userOrders} from "./helper/dashHelper";

const Dashboard = () => {
    const [orders, setOrders] = useState([])
    const jwt = JSON.parse(localStorage.getItem("jwt"))
    const token = jwt.Token
    console.log(token)
    const userId = jwt.user.id
    console.log(userId)
    const getOrders = () => {
        userOrders(userId, token)
            .then((data) => {
                console.log("Loading Orders")
                if (data.error) {
                    console.log("Error in loading orders")
                } else {
                    setOrders(data)
                    console.log("Loaded Orders!")
                }

            })
    }
    useEffect(() => {
        getOrders()
    }, []);

    console.log(orders)
    return (
        <Base title={"User Dashboard"}>
            <h1> Welcome to Dashboard</h1>

            <div className="container row">
                {orders.map((order, index) => {
                    return (

                        <div key={index} className="card text-center border bg-dark display-block mx-5 my-3 ">
                            <div className="card-header">
                                Order ID: {order.transaction_id}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">Products: {order.products}</h5>
                                <p className="card-text">Total Paid: {order.total_amount}$</p>
                                <p className="card-text">Ordered At: {order.created_at}</p>

                            </div>
                        </div>

                    )
                })}
            </div>

        </Base>
    )
}

export default Dashboard