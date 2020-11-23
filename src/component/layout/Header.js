import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import { UserContext } from '../../store/UserProvider'
import { CartContext } from '../../store/CartProvider'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function Header() {
    const { login } = useContext(LoginContext)
    const { url } = useContext(UrlContext)
    const { user, setUser } = useContext(UserContext)
    const { cart, addCart } = useContext(CartContext)

    const logout = () => {
        localStorage.clear()
    }
    const Logined = () => {

        return <>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    <FontAwesomeIcon icon={faShoppingCart}/> <span className="badge badge-danger">{cart.length}</span>
                </a>
                <div className="dropdown-menu">
                    {cart.map((item, index) => (
                        <a key={index} className="dropdown-item" href="">{item.productName} ({item.productCount})</a>
                    ))}
                    <Link to="/cart" className="dropdown-item" >ไปยังตะกร้าสินค้า</Link>
                </div>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    {user.fname + ' ' + user.lname}
                </a>
                <div className="dropdown-menu">
                    <a className="dropdown-item" href="" onClick={logout}>Logout</a>
                </div>
            </li>
        </>


    }

    const NullLogin = () => {

        return <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
        </li>

    }

    const getData = async () => {
        let res = await axios.get(url + "users/memberID", {
            params: {
                memberID: localStorage.userID
            }
        })

        setUser(res.data[0])
    }

    useEffect(() => {
        if (localStorage.userID != null) {
            getData()
        }

    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                <Link className="navbar-brand" href="#" to="/">IT Ticket</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                        {login ? <Logined /> : <NullLogin />}
                    </ul>
                </div>
            </nav>
        </div>
    );
}




export default Header;
