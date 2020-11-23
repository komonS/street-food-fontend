import React, { createContext, useReducer } from "react"

export const CartContext = createContext({})

const initialState = {
    cart: []
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state, // copy state 
                cart: [...state.cart ,action.payload] // set state counter
            }
        case "SUB_CART":
            return {
                ...state, // copy state --
                cart: state.cart - action.payload // set state counter
            }
    }
}

export const CartProvider = ({ children }) => {
    const [cartState, cartDispatch] = useReducer(
        cartReducer,
        initialState
    )

    const { cart } = cartState

    const addCart = payload =>
        cartDispatch({ type: "ADD_CART", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
    const subCart = payload =>
        cartDispatch({ type: "SUB_CART", payload }) // ส่ง type SUB_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

    return (
        <CartContext.Provider value={{ cart, addCart, subCart }}>
            {children}
        </CartContext.Provider>
    )
}