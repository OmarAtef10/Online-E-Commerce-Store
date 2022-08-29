import React, {useState, useEffect} from "react";
import {getProducts} from "./helper/coreApiCalls";
import ImageHelper from "./helper/imageHelper";
import Base from "./base";
import "../styles.css"
import Card from "./card";

export default function Home() {
    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts()
            .then((data) => {
                console.log("loading Products")
                if (data.error) {
                    setError(data.error)
                    console.log(error)
                } else {
                    setProducts(data)
                    console.log("Loaded")

                }
            })

    }


    useEffect(() => {
        console.log("loading Effects")

        loadAllProducts();
    }, []);

    console.log(products)

    return (
        <Base title="Home Page" description="Welcome To my Website Have A nice Day!">
            <h1 className="text-center">Home</h1>
            <div className='row'>
                {products.map((product, index) => {
                    if (index % 2 === 0) {
                        return (
                            <div key={index} className='col-6 mb-4'>
                                <Card product={product}/>
                            </div>

                        )
                    }else{
                        return (
                            <div key={index} className='col-6 mb-4'>
                                <Card product={product}/>
                            </div>

                        )
                    }
                })}
            </div>
        </Base>
    );
}