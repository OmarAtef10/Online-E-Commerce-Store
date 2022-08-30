import React, {useState} from "react";
import Base from "../core/base";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper";

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });
    const {name, email, password, error, success} = values

    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const signupForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left d-md-block">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input type="text" className={"form-control"} value={name}
                                   onChange={handleChange("name")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input type="text" className={"form-control"} value={email}
                                   onChange={handleChange("email")}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input type="password" className={"form-control"} value={password}
                                   onChange={handleChange("password")}
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="btn btn-success btn-block my-2 col-12" type="submit">Sign Up
                        </button>

                    </form>
                </div>
                <p>
                    <h2>Already have an Account? <button className="btn btn-success btn-block mx-1">
                        <Link to="/signin">
                            Sign In</Link></button> Now!
                    </h2>
                </p>
            </div>
        )
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false})
        signup({name: name, email: email, password: password})
            .then(data => {
                console.log("DATA", data)
                if (data.email === email) {
                    setValues({
                        ...values,
                        name: "",
                        email: "",
                        error: "",
                        password: "",
                        success: true
                    })
                } else {
                    setValues({
                        ...values,
                        name: name,
                        email: email,
                        error: data.email,
                        success: false
                    })
                }
            })
            .catch(e => console.log(e))
    }

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success"
                         style={{display: success ? "" : "none"}}>
                        New Account Created!
                        <Link to="/signin">Login</Link>
                    </div>
                </div>
            </div>
        )
    }
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                         style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
        )
    }
    return (

        <Base title={"Sign UP"} description={"Sign Up for The Website DUHH!"}>
            {successMessage()}
            {errorMessage()}
            {signupForm()}
            <p className={"text-white"}>
                {JSON.stringify(values)}
            </p>
            <p>Signup Page !</p>
        </Base>
    )
};

export default Signup