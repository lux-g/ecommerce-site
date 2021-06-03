import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

const Nav = ({ cart, getCartTotal }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="nav">
                <Link to="/" className="nav__logo" href="">9 FIFTY</Link>
                <Link to="/cart" className="nav__cart" href="">CART - {getCartTotal()}</Link>     
            </div>
        </motion.div>
    )
}

export default Nav
