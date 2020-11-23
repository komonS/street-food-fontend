import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'

export default function ShopHeader(props) {
    const { url } = useContext(UrlContext)

    const [shop, setShop] = useState([])

    const getShopData = async () => {
        let res = await axios.get(url + 'shop/' + props.shopID)
        setShop(res.data[0])
        console.log(res.data[0])
    }

    useEffect(() => {
        getShopData()
    }, [])
    return (
        <div className="shop-header">
            <div className="shop-box-image">
                <img className="shop-image" src={'http://localhost/street-food/image/' + shop.shopImage} />
            </div>
            <div className="shop-name">
                <h3>{shop.shopName}</h3>
                <div>
                    <p>
                        {shop.shopDescript}
                    </p>
                </div>
            </div>
        </div>
    )
}
