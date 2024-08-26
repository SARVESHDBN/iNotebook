import React, {useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';


export default function Navbar() {
    let location = useLocation();
    useEffect(() => {
        // Google Analytics
        console.log(location.pathname);
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/home">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/home"? "active": ""}`} aria-current="page" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" role="button" to="/signup">SignUp</Link>
                        <Link className="btn btn-primary mx-2" role="button" to="/login">Login</Link>
                    </form>
                </div>
            </div>
        </nav>
        
    )
}
