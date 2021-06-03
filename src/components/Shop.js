import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom' 
import Tilt from 'react-vanilla-tilt'
import Ethos from './Ethos'
import Parallax from 'react-rellax'
import { motion } from "framer-motion"
import { gsap, ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)


const Shop = ({ products, tees }) => {

    useEffect(()=> {
        gsap.to(".products-title span", {duration: 1.8, y: "0%", ease: 'power4.out'}, 0.2)

    }, [])

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
            <div className="overflow-container">
                <h2 className="products-title"><span>HOODIES & TEES</span></h2>
                <div className="all-products">
                    <div className="hoodies">
                        {products.map(product => (
                                <div className="products-hoodie" key={product.id}>
                                    <Link to={`/products/${product.tag}`}>
                                        <div className="products-hoodie__product-one">  
                                            <Parallax speed={1}>
                                                <Tilt style={{ width: "100%" }}>
                                                    <img className="product-img" src={product.img} alt=""/>
                                                </Tilt>
                                                <div className="products-hoodie__product-info">
                                                    <p>{product.title}</p>
                                                    <p>$ {product.price} USD</p>
                                                </div>
                                            </Parallax>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        
                    <div className="tees">
                        {tees.map(tee => (
                            <div className="products-tee" key={tee.id}>
                                <Link to={`/products/${tee.tag}`}>
                                    <div className="products-hoodie__product-one">
                                        <Parallax speed={0.6}>
                                            <Tilt style={{ width: "100%" }}>
                                                <img className="product-img" src={tee.img} alt=""/>
                                            </Tilt>
                                            <div className="products-hoodie__product-info">
                                                <p>{tee.title}</p>
                                                <p>$ {tee.price} USD</p>
                                            </div>
                                        </Parallax>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>    
                </div>

                <Ethos/>
            </div>
        </motion.div>
    )
}

export default Shop
