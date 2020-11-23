import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import { UserContext } from '../../store/UserProvider'
import { CartContext } from '../../store/CartProvider'

export default function Cart() {
    const { url } = useContext(UrlContext)
    const { cart, addCart } = useContext(CartContext)

    const [total, setTotal] = useState(0)

    const calTotal = () => {
        
        let t = 0
        cart.forEach(item => {
            t += (item.productCount * item.productPrice)
        });
        console.log(t)
        setTotal(t)
        
    }

    useEffect(() => {
        calTotal()
    }, [])

    return (
        <div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>
                                ชื่อสินค้า
                            </th>
                            <th>
                                จำนวน
                            </th>
                            <th>
                                ราคา
                            </th>
                            <th>
                                ราคารวม
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    {item.productName}
                                </td>
                                <td>
                                    {item.productCount}
                                </td>
                                <td>
                                    {item.productPrice}
                                </td>
                                <td>
                                    {item.productCount * item.productPrice}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3">รวมทั้งหมด</td>
                            <td>
                                {total}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
