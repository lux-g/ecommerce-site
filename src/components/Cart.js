import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"


const Cart = ({ cart, addToCart, removeFromCart, totalCost, decreaseQuantity }) => {

    useEffect(()=> {
        window.scrollTo(0, 0)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="cart-page">
                <div className="cart-info">
                </div>
                {cart.length === 0 && 
                    <div className="empty-cart">
                        <h1>Your cart is empty</h1>
                        <Link to="/shop" className="go-shopping"><span>Go Shopping</span></Link>
                    </div>
                }
                {cart.map((product, index) => (
                    <div className="incart" key={index}>
                        <div className="cart-img">
                            <img src={product.img} alt=""/>
                        </div>
                        <div className="cart-text">
                            <p className="title">{product.title}</p>
                            <p className="price">$ {product.price}</p>
                            <div className="buttons">
                                <p className="quan">quantity</p>
                                <button className="increase" onClick={()=> addToCart(product)}>+</button>
                                <p className="quantity">{product.quantity}</p>
                                <button className="decrease" onClick={()=> decreaseQuantity(product)}>-</button>
                            </div>
                            <button className="remove-btn" onClick={()=> removeFromCart(product)}><span>Remove</span></button>
                        </div>
                    </div>
                ))}
            </div>
            
            {cart.length > 0 && 
                <div className="total">
                <div className="total-left">
                    <Link to="/shop"><span>Back to shop</span></Link>
                </div>
                <div className="total-right">
                    <span>Total ${totalCost()}</span>
                    <button className="checkout-btn">CHECKOUT</button>
                </div>
            </div>
            }
            
            
        </motion.div>
    )
}

export default Cart
