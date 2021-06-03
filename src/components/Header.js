import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from "gsap";
import { motion } from "framer-motion"

const Header = () => {

    useEffect(()=> {
        let vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })

    useEffect(()=> {
        window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    })

    useEffect(()=> {
        gsap.to('.hero__title span', { delay: 0.9, duration: 1.4, y: "0%", ease: 'power4.out', stagger: 0.1})

    },[])


    return (
        <main>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="main-nav">
                    <Link to="/about" className="main-nav__about-us" href="">ABOUT</Link>
                    <Link to="/shop" className="main-nav__shop-now" href="">SHOP</Link>
                </div> 
            
            <div className="content">
                <div className="grid">
                    <div className="grid__item pos-1">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-2">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-3">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-4">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-5">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-6">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-7">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-8">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-9">
                        <div className="grid__item-img"></div>
                    </div>
                    <div className="grid__item pos-10">
                        <div className="grid__item-img"></div>
                    </div>
                </div>

                <div className="hero">
                        <h2 className="hero__title">
                            <span className="hero__title-one">
                                <span>NINE</span>
                            </span>
                            <span className="hero__title-sub">
                                <span>FIFTY</span>
                            </span>
                            <span className="hero__title-sub-two">
                                <span>STORE</span>
                            </span>
                        </h2>
                    </div>
                
                </div>
                
            </motion.div>
        </main>
    )
}

export default Header


