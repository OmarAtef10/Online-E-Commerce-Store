import React from "react";
import Menu from "./menu";

const Base = ({
                  title = "My Title",
                  description = "my Description",
                  ClassName = "bg-dark text-white p-4",
                  children
              }) => {

    return (
        <div>
            <Menu/>
            <div className="container-fluid text-center">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={ClassName}>{children}</div>
            </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-center py-3 text-white">
                    <h4>
                        if you have any question contact me via Mail!
                        <button className="btn btn-warning btn-lg">Contact US</button>
                        <div className="container">
                            <span className="text-warning">
                                Omar's E-Commerce App (React and Django)
                            </span>
                        </div>
                    </h4>
                </div>
            </footer>
        </div>
    )
}
export default Base