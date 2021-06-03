import { useState, useEffect, useRef } from 'react'
import Header from './components/Header';
import Shop from './components/Shop';
import About from './components/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'  
import Nav from './components/Nav'
import Cart from './components/Cart';
import EachProduct from './components/EachProduct';
import { AnimatePresence } from "framer-motion"

//IMAGES
import hoodieOne from './images/hoodie1.webp'
import hoodieOneBack from './images/hoodie1-back.webp'
import hoodieTwo from './images/hoodie2.webp'
import hoodieTwoBack from './images/hoodie2-back.webp'
import teeOne from './images/tee1.webp'
import teeOneBack from './images/tee1-back.webp'
import teeTwo from './images/tee2.webp'
import teeTwoBack from './images/tee2-back.webp'



function App() {

  //HOODIES
  const [products] = useState([
    {
        title: "CAMO HOODIE",
        tag: "CamoHoodie",
        info: "Our 14oz. heavy-weight CROOKS Camo Hoodie features an alternative logo in an off-white print. Designed and manufactured in New York, (NY)",
        price: 90,
        img: hoodieOne,
        imgBack: hoodieOneBack,
        id: 1,
        quantity: 1
    },
    {
        title: "PRIDE HOODIE",
        tag: "PrideHoodie",
        info: "Our 14oz. heavy-weight CROOKS Pride Hoodie features an alternative logo in an off-white print. Designed and manufactured in New York, (NY)",
        price: 80,
        img: hoodieTwo,
        imgBack: hoodieTwoBack,
        id: 2,
        quantity: 1

    }

  ])
  //TEES
  const [tees] = useState([
    {
        title: "CC TEE",
        tag: "CCTee",
        info: "Our 10oz. light-weight CROOKS CC Tee features an alternative logo in an off-white print. Designed and manufactured in New York, (NY)",
        price: 32,
        img: teeOne,
        imgBack: teeOneBack,
        id: 3,
        quantity: 1
    },
    {
        title: "KLEPTO TEE",
        tag: "KleptoTee",
        info: "Our 10oz. light-weight CROOKS Klepto Tee features an alternative logo in an off-white print. Designed and manufactured in New York, (NY)",
        price: 32,
        img: teeTwo,
        imgBack: teeTwoBack,
        id: 4,
        quantity: 1
    }
  ])

  //CART
  const [cart, setCart] = useState([])

  //LOCAL STORAGE
  useEffect(()=> {
    const data = localStorage.getItem('my-cart')
    if(data) {
      setCart(JSON.parse(data))
    }
  }, [])

  useEffect(()=> {
    localStorage.setItem('my-cart', JSON.stringify(cart))
  })

  //ADD TO CART
  const addToCart = (product) => {
    let itemInCart = cart.find(item => product.tag === item.tag)
    let newCart = [...cart]

    if(itemInCart){
      itemInCart.quantity++
    }
    else {
      itemInCart = {
        ...product,
        quantity: 1
      }
      newCart.push(itemInCart)
    }
    setCart(newCart)
  }

  //REMOVE FROM CART
  const removeFromCart = (productToRemove) => {
    setCart(cart.filter(product => product !== productToRemove))
  }
  //REMOVE QUANTITY
  const decreaseQuantity = (product) => {
    //make new cart array which is the old array
    let newCart = [...cart];
    //loop through new cart and find item equal to product name
    let itemInCart = newCart.find((item) => product.tag === item.tag);
    //if item exists quantity is decreased
    if(itemInCart.quantity > 1) {
      itemInCart.quantity--
    }
    setCart(newCart) 

  }
  //TOTAL COST
  const totalCost = ()=> {
    return cart.reduce((sum, {price, quantity}) => sum + price * quantity, 0)
  }
  //DISPLAY CART TOTAL
  const getCartTotal = () => {
    return cart.reduce((sum, {quantity}) => sum + quantity, 0)
  }

  return (
    <Router>
      <div className="App">
        <Nav cart={cart} getCartTotal={getCartTotal}/>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={Header}/>
            <Route path="/about" component={About}/>
            <Route path="/shop">
              <Shop products={products} tees={tees}/>
            </Route>
            <Route path="/products/:tag">
              <EachProduct products={products} tees={tees} addToCart={addToCart}/>
            </Route> 
            <Route path="/cart">
              <Cart cart={cart} removeFromCart={removeFromCart} totalCost={totalCost} addToCart={addToCart} decreaseQuantity={decreaseQuantity}/>
            </Route> 
            </Switch>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
