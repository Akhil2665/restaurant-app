import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Cart from './Components/Cart'
import CartContext from './Context/CartContext'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    console.log('dish:', dish)

    this.setState(prevState => {
      const {cartList} = prevState

      if (cartList.length === 0) {
        return {cartList: [...cartList, dish]}
      }
      const isItemExists = cartList.find(item => item.dishId === dish.dishId)
      console.log('isItemExists:', isItemExists)

      if (isItemExists) {
        return {
          cartList: cartList.map(item =>
            item.dishId === dish.dishId ? dish : item,
          ),
        }
      }
      // If item does not exist, add it to the cart
      return {cartList: [...cartList, dish]}
    })
  }

  // addCartItem = product => {
  //   const {cartList} = this.state
  //   const updateQuantityCartList = cartList.map(eachItem =>
  //     eachItem.id === product.id
  //       ? {...eachItem, quantity: eachItem.quantity + product.quantity}
  //       : eachItem,
  //   )
  //   const existingProduct = cartList.find(
  //     eachItem => eachItem.id === product.id,
  //   )
  //   if (existingProduct) {
  //     this.setState({cartList: updateQuantityCartList})
  //   } else {
  //     this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  //   }
  // }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(eachItem => eachItem.dishId !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedList = cartList.map(eachItem =>
      eachItem.dishId === id && eachItem.quantity >= 1
        ? {...eachItem, quantity: eachItem.quantity - 1}
        : eachItem,
    )
    const filterdList = updatedList.filter(eachItem => eachItem.quantity !== 0)
    this.setState({cartList: filterdList})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedList = cartList.map(eachItem =>
      eachItem.dishId === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )

    this.setState({cartList: updatedList})
  }

  // onDecrementQuantity = () => {
  //   const {quantity} = this.state
  //   if (quantity > 1) {
  //     this.setState(prevState => ({quantity: prevState.quantity - 1}))
  //   }
  // }

  // onIncrementQuantity = () => {
  //   this.setState(prevState => ({quantity: prevState.quantity + 1}))
  // }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
