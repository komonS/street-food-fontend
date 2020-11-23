import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import { CartContext } from '../../store/CartProvider'

export default function ShopProduct(props) {
    const { url } = useContext(UrlContext)
    const { cart, addCart } = useContext(CartContext)

    const [product, setProduct] = useState([])
    const [productID, setProductID] = useState('')
    const [productCount, setProductCount] = useState(0)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(0)

    const getProductList = async () => {
        let res = await axios.get(url + 'shop/product/' + props.shopID)
        setProduct(res.data)
        console.log(res.data)
    }

    const setItem = (name,id,price) => {
        setProductName(name)
        setProductID(id)
        setProductPrice(price)
    }

    const setCart = () => {
        let c = {
            productID : productID,
            productName : productName,
            productCount : productCount,
            productPrice : productPrice
        }

        addCart(c)
    }

    useEffect(() => {
        getProductList()
    }, [])

    return (
        <div className="shop-product-list">
            <div className="row">
                {product.map((item, index) => (
                    <div key={index} className="col-md-3">
                        <div className="card" style={{ height: 350 }}>
                            <div className="card-body">
                                <h4 className="card-title">{item.productName} ({item.productPrice} &#3647;)</h4>
                                <p className="card-text">{item.productDetail}</p>
                                <button data-toggle="modal" data-target="#myModal" onClick={() => setItem(item.productName,item.productID,item.productPrice)} className="btn btn-warning">Buy</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="modal fade" id="myModal">
                <div className="modal-dialog ">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h4 className="modal-title">กรุณาเลือกจำนวนสินค้า</h4>
                            <button type="button" className="close" data-dismiss="modal">×</button>
                        </div>
                        {/* Modal body */}
                        <div className="modal-body text-center">
                            <div className="form-group">
                                <button className="btn btn-danger btn-sm" onClick={() => setProductCount(productCount - 1)}>-</button>
                                <input className="shop-count-input" value={productCount} onChange={e => setProductCount(e.target.value)} />
                                <button className="btn btn-danger btn-sm" onClick={() => setProductCount(productCount + 1)}>+</button>
                            </div>
                            <button className="btn btn-success" onClick={setCart}>ยืนยัน</button>
                        </div>
                        {/* Modal footer */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}
