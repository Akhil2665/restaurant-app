import React from 'react'
import {useHistory} from 'react-router-dom'

import Navbar from '../Navbar'
import CartContext from '../../Context/CartContext'
import CartItem from '../CartItem'
// import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => {
  const history = useHistory()
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, removeAllCartItems} = value

        const cartCount = Array.isArray(cartList) ? cartList.length : 0
        const showEmptyView = cartCount === 0
        let totalCartAmount = 0
        if (cartList.length > 0) {
          const cartValueList = cartList.map(
            eachItem => eachItem.dishPrice * eachItem.quantity,
          )
          totalCartAmount = cartValueList.reduce((acc, curr) => acc + curr, 0)
        }
        const onClickOnRemoveAll = () => removeAllCartItems()
        const onClickedOrdernow = () => {
          history.push('/')
        }

        return (
          <>
            <Navbar />
            <div className="cart-container">
              {showEmptyView ? (
                <div className="cart-empty-view-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                    className="no-orders-image"
                    alt="empty cart"
                  />
                  <h1>Cart is empty</h1>
                  <button
                    className="order-now-btn"
                    type="button"
                    onClick={onClickedOrdernow}
                  >
                    Order now
                  </button>
                </div>
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    className="remove-all-button"
                    type="button"
                    onClick={onClickOnRemoveAll}
                  >
                    Remove All
                  </button>
                  {cartCount > 0 ? (
                    <ul className="cart-list">
                      {cartList.map(eachCartItem => (
                        <CartItem
                          key={eachCartItem.dishId}
                          cartItemDetails={eachCartItem}
                        />
                      ))}
                    </ul>
                  ) : (
                    <img src="" className="empty-cart-image" alt="empty cart" />
                  )}
                  {/* TODO: Add your code for Cart Summary here */}
                  <div className="order-summary-container">
                    <div className="order-amount-container">
                      <h1 className="order-total-heading">Order Total: </h1>
                      <h1 className="order-amount-heading">
                        Rs {totalCartAmount} /-
                      </h1>
                    </div>
                    <p className="order-quantity">{cartCount} Items in cart</p>
                    <button className="button checkout-button" type="button">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}
export default Cart
