import React, {useState} from "react";
import Base from "../core/base";
import {Link, Redirect} from "react-router-dom";
import {authenticate, isAuthenticated, signin, signup} from "../auth/helper";


const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });
    const {email, password, error, success, loading, didRedirect} = values


    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left d-md-block">
                    <form>
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
                            onClick={onSubmit}
                            className="btn btn-success btn-block my-2 col-12" type="submit">Sign in
                        </button>

                    </form>
                </div>
                <p>
                    <h2>Don't have an Account? <button className="btn btn-success btn-block mx-1">
                        <Link to="/signup">
                            Sign Up</Link></button> Instead!
                    </h2>
                </p>
            </div>
        )
    }


    const handleChange = name => event => {
        setValues({
            ...values,
            error: false,
            [name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: false, loading: true,})
        signin({email, password})
            .then(data => {
                console.log("DATA", data)
                if (data.Token) {
                    let sessionToken = data.Token;
                    authenticate(sessionToken, () => {
                        console.log("TOKEN ADDED")
                    })
                    setValues({
                        email: "",
                        password: "",
                        success: true,
                        error: false,
                        didRedirect: true,
                        loading: true
                    })
                } else {
                    if (data.Error === "Enter a Valid Email!") {
                        setValues({
                            email: "",
                            password: "",
                            error: data.Error, success: false
                        })
                    } else {
                        setValues({
                            email: email,
                            password: "",
                            error: data.Error, success: false
                        })
                    }
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
                        SignedIn!
                        <Link to="/user/dashboard">Dashboard</Link>
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

    const loadingMsg = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }
    const preformRedirect = () => {
        if (isAuthenticated()) {
            return <Redirect to={"/"}/>
        }
    }


    return (
        <Base title={"Sign in"} description={"Welcome Home User!"}>
            {successMessage()}
            {errorMessage()}
            {loadingMsg()}
            {signInForm()}
            <p className={"text-center"}>
                {JSON.stringify(values)}
            </p>
            {preformRedirect()}
        </Base>
    )
};

export default Signin