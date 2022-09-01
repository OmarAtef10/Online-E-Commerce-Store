import React, {useState, useEffect} from "react";
import Card from "./card";
import {loadCart} from "./helper/cartHelper";
import Base from "./base";
import PaymentB from "./paymentB";
import {Link} from "react-router-dom";

const Cart = () => {
    const [reload, setReload] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                {products.map((product, index) => (
                    <Card
                        key={index}
                        product={product}
                        remove_Cart={true}
                        add_Cart={false}
                        reload={reload}
                        setReload={setReload}
                    />
                ))}
            </div>
        );
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                         style={{display: reload ? "" : "none"}}>
                        Order is on It's Way!
                        <p><Link to="/user/dashboard">Dashboard</Link></p>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <Base title="Cart page" description="Welcome to checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? (loadAllProducts(products)) : (
                        <h4>No products</h4>
                    )}
                </div>

                <div className="col-6">
                    {reload ? (successMessage()) : (

                            products.length > 0 ? (
                                <PaymentB products={products} setReload={setReload}/>
                            ) : (
                                <h3>please add something to the Cart</h3>
                            )
                        )}
                </div>
            </div>
        </Base>
    );
};

export default Cart;
