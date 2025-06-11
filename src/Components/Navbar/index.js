import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'

const Navbar = ({cartItems}) => {
  console.log('nav', cartItems)
  const cartLength = cartItems.length
  return (
    <nav className="nav-container">
      <h1 className="rest-logo">UNI Resto Cafe</h1>
      <ul className="nav-list">
        <li>My Orders</li>
        <li>
          <AiOutlineShoppingCart /> <span>{cartLength}</span>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
