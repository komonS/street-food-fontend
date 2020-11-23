import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'

export default function ShopAll() {
    const { url } = useContext(UrlContext)

    const [shop, setShop] = useState([])

    const getShopAll = async () => {
        let res = await axios.get(url + 'shop')
        setShop(res.data)
    }

    useEffect(() => {
        getShopAll()
    }, [])

    return (
        <div className="row" style={{ marginTop: 10 }}>
            {shop.map((item, index) => (
                <div key={index} className="col-md-3">
                    <div className="card" style={{ height: 350 }}>
                        <img className="card-img-top" style={{height:200}} src={'http://localhost/street-food/image/' + item.shopImage} alt="Card image" />
                        <div className="card-body">
                            <h4 className="card-title">{item.shopName}</h4>
                            <p className="card-text">{item.shopDescript}</p>
                            <Link to={'shop/'+item.shopID} className="btn btn-primary">View Shop</Link>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}
