import React from 'react'
import { useEffect } from 'react'
import groupAll from '../images/groupwhite.png'
import { gsap, ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger)


const Ethos = () => {

    useEffect(()=> {
        //ETHOS ANIMATION
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".content-ethos",
            }
        });
        tl.to(".title-ethos span", {duration: 1.8, y: "0%", ease: 'power4.out'}, 0.3)

        let tlTwo = gsap.timeline({
            scrollTrigger: {
                trigger: ".content-handmade__text",
            }
        });
        tlTwo.from(".content-handmade", {duration: 1.8, y: 50, opacity: 0, ease: 'power4.out', stagger: 0.3}, 0.4)

    }, [])

    return (
        <>
            <div className="content-ethos">
                <div className="title-ethos">
                    <h2 className="content-ethos__title-ethos"><span>ETHOS</span></h2>
                </div>
                <img className="ethos-img" src={groupAll} alt=""/>
            </div>

            <div className="content-handmade">
                <div className="content-handmade__text">
                    <p>Handmade, quality, limited run products. Get em while they’re hot!</p>
                    <p>Quality is everything, all products are made in batches specifically for you to assure the best quality!.</p>
                </div>
            </div>
            <div className="content-handmade">
                <div className="content-handmade__text">
                    <p>Good vibes, good humor, nothing negative.</p>
                    <p>The world is crazy enough, our products are made to inspire and bring joy..</p>
                </div>
            </div>
            <div className="content-handmade handmade-last-one">
                <div className="content-handmade__text">
                    <p>Inspired by personal stories.</p>
                    <p>Each product was inspired by a story or personal moment from a member of the team. Our goal is to make dope products!</p>
                </div>
            </div>
            
            <footer>
                <h2>9FIFTY <br/> All Rights Reserved</h2>
            </footer>
        </>
    )
}

export default Ethos
