import React from 'react'
import { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import EachProductMobile from './EachProductMobile'
import { motion } from "framer-motion"

const EachProduct = ({ products, tees, addToCart }) => {
    const { tag } = useParams()

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
            <div className="container">
                <Link to="/shop"><h1>Back to Shop</h1></Link>
                {products.filter(product => product.tag === tag).map(product => (
                    <section className="product" key={product.id}>
                        <div className="product__pages">
                            <div>
                                <img className="hoodie" src={product.img} alt=""/>
                            </div>
                            <div>
                                <img className="hoodie" src={product.imgBack} alt=""/>
                            </div>
                        </div>
                        <div className="product__wrapper">
                            <div className="product__text-one">
                                <p>{product.title}</p>
                                <p>$ {product.price}</p>
                            </div>
                            <div className="product__text-two">
                                <p>{product.info}</p>
                            </div>
                            <Link to="/cart" className="link-btn"><button onClick={()=> addToCart(product)} className="product__button">ADD TO CART</button></Link>
                        </div>
                    </section>
                ))}
                {tees.filter(tee => tee.tag === tag).map(tee => (
                    <section className="product" key={tee.id}>
                        <div className="product__pages">
                            <div>
                                <img className="hoodie" src={tee.img} alt=""/>
                            </div>
                            <div>
                                <img className="hoodie" src={tee.imgBack} alt=""/>
                            </div>
                        </div>
                        <div className="product__wrapper">
                            <div className="product__text-one">
                                <p>{tee.title}</p>
                                <p>$ {tee.price}</p>
                            </div>
                            <div className="product__text-two">
                                <p>{tee.info}</p>
                            </div>
                            <Link to="/cart" className="link-btn"><button onClick={()=> addToCart(tee)} className="product__button">ADD TO CART</button></Link>
                        </div>
                    </section>
                ))}
                <EachProductMobile products={products} tees={tees} addToCart={addToCart}/>
                <footer>
                    <h2>9FIFTY <br/> All Rights Reserved</h2>
                </footer>
            </div>
        </motion.div>
    )
}

export default EachProduct
