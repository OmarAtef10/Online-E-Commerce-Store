import React, {useState} from "react";
import ImageHelper from "./helper/imageHelper";
import {Redirect} from "react-router-dom";
import {addItemToCart, removeItem, cartEmpty, loadCart} from "./helper/cartHelper";
import {isAuthenticated} from "../auth/helper";

const Card = ({
                  product,
                  add_Cart = true,
                  remove_Cart = false,
                  reload = undefined,
                  setReload = f => f,

              }) => {

    const [redirect, setRedirect] = useState(false)


    const prodName = product ? product.name : "Default Name"
    const prodDesc = product ? product.description : "Default Description"
    const prodPrice = product ? product.price : "Default Price (NONE lol)"

    const addToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, () => {
                setRedirect(true)
            })
            console.log("Added To Cart")
        } else {
            console.log("Login First")
        }
    };
    const getAredirect = (redirect) => {
        return <Redirect to="/cart"/>
    };

    const showAddtoCart = add_Cart => {
        return (
            add_Cart && (<div className="col-12">
                <button
                    onClick={addToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2">
                    Add to Cart
                </button>
            </div>)
        )
    };

    const showRemoveFromCart = remove_Cart => {
        return (
            remove_Cart && (
                <div className="col-12">
                    <button
                        onClick={() => {
                            removeItem(product.id)
                            setReload(!reload)
                        }}
                        className="btn btn-block btn-outline-danger mt-2 mb-2"
                    >
                        Remove from cart
                    </button>
                </div>
            )
        )
    }


    return (
        <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead text-center">{prodName}</div>
            <div className="card-body">
                <ImageHelper product={product}/>
                <p className="lead bg-success font-weight-normal text-wrap mt-2">
                    {prodDesc}
                </p>
                <p className="btn btn-success rounded  btn-sm px-4">{prodPrice}</p>
                <div className="row">
                    {showAddtoCart(add_Cart)}
                    {showRemoveFromCart(remove_Cart)}
                </div>
            </div>
        </div>
    );
};

export default Card;