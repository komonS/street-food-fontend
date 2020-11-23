import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { LoginContext } from '../../store/LoginProvider'
import { UrlContext } from '../../store/UrlProvider'
import '../../css/Shop.css'
import ShopHeader from '../widget/ShopHeader';
import ShopProduct from '../widget/ShopProduct';
export default function Shop() {
    const {id} = useParams()
    return (
        <div>
            <div>
                <ShopHeader shopID={id} />
            </div>
            <div>
                <ShopProduct shopID={id} />
            </div>
        </div>
    )
}
