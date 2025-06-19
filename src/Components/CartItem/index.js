import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {
        dishId,
        dishName,
        dishCalories,
        quantity,
        dishPrice,
        dishImage,
        dishType,
      } = cartItemDetails
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onClickIncrementQunatity = () => incrementCartItemQuantity(dishId)
      const onClickDecrementQunatity = () => decrementCartItemQuantity(dishId)

      return (
        <li className="cart-item">
          <div
            className={`veg-border ${
              dishType === 1 ? 'non-veg-border' : ''
            } me-3`}
          >
            <div
              className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`}
            />
          </div>
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickDecrementQunatity}
                data-testid="minus"
              >
                <BsDashSquare color="#52606D" size={12} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onClickIncrementQunatity}
                data-testid="plus"
              >
                <BsPlusSquare color="#52606D" size={12} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dishPrice * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
