import React from 'react'
import { useParams, Link } from "react-router-dom"

const EachProductMobile = ({products, tees, addToCart}) => {
    const { tag } = useParams()

    return (
        <div>
            <div className="hoodie-products">
                {products.filter(product => product.tag === tag).map(product => (
                    <section className="mobile" key={product.id}>
                        <div className="mobile-img">
                            <img src={product.img} alt=""/>
                            <img src={product.imgBack} alt=""/>
                        </div>
                        <div className="mobile__title">
                            <div className="mobile__text-one">
                                <p>{product.title}</p>
                                <p>$ {product.price}</p>
                            </div>
                            <div className="mobile__text-two">
                                <p>{product.info}</p>
                            </div>
                            <Link to="/cart"><button onClick={()=> addToCart(product)} className="mobile__btn">ADD TO CART</button></Link>
                        </div>
                    </section>
                ))}
            </div>

            <div className="tees-products">
                {tees.filter(tee => tee.tag === tag).map(tee => (
                    <section className="mobile" key={tee.id}>
                        <div className="mobile-img">
                            <img src={tee.img} alt=""/>
                            <img src={tee.imgBack} alt=""/>
                        </div>
                        <div className="mobile__title">
                            <div className="mobile__text-one">
                                <p>{tee.title}</p>
                                <p>$ {tee.price}</p>
                            </div>
                            <div className="mobile__text-two">
                                <p>{tee.info}</p>
                            </div>
                            <Link to="/cart"><button onClick={()=> addToCart(tee)} className="mobile__btn">ADD TO CART</button></Link>
                        </div>
                    </section>
                ))}
            </div>

            
        </div>
    )
}

export default EachProductMobile
