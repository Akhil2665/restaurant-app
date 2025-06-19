import {useContext} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {FaShoppingCart} from 'react-icons/fa'

import CartContext from '../../Context/CartContext'

import './index.css'

const Navbar = props => {
  // const {cartItems} = props
  const {cartList} = useContext(CartContext)
  const getCartItemsCount = () => cartList.length
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickedCartIcon = () => {
    history.push('/cart')
  }
  const renderCartIcon = () => (
    <div className="cart-icon-link">
      <Link to="/cart">
        <button type="button" className="cart-icon-button" data-testid="cart">
          <FaShoppingCart className="cart-icon" />
        </button>
      </Link>
      <div className="cart-count-badge d-flex justify-content-center align-items-center">
        <p className="m-0 cart-count">{cartList.length}</p>
      </div>
    </div>
  )

  return (
    <header className="p-4 d-flex flex-row align-items-center nav-header">
      <h1 className="m-0 logo-heading">UNI Resto Cafe</h1>
      <div className="d-flex flex-row align-items-center ms-auto">
        <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
          My Orders
        </p>
        {renderCartIcon()}
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default withRouter(Navbar)
