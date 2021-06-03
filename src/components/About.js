import React from 'react'
import { useEffect } from 'react'
import storeImg from '../images/store.webp'
import { motion } from "framer-motion"


const About = () => {

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


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="about-page">
                <div className="about-page__text">
                    <p>9 Fifty is deeply rooted in street culture with a luxury aesthetic. We grew to embody culture, and play an integral part in its constant regeneration. Skaters, punks, hip-hop heads and the young counter culture at large. 9 Fifty established itself as a brand known for its quality, style, and authenticity, made for artists, photographers, designers, musicians, filmmakers, and writers who defied conventions and contributed to its unique identity and attitude.</p>
                </div>
                <div className="about-page__img">
                    <img src={storeImg} alt=""/>
                </div>
            </div>
        </motion.div>
    )
}

export default About
