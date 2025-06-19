import {useState} from 'react'

import './index.css'

const DishItem = ({
  dishDetails,
  cartItems,
  addItemToCart,
  removeItemFromCart,
}) => {
  const [dishQuantity, setDishQuantity] = useState(0)
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishCalories,
    addonCat,
    dishAvailability,
  } = dishDetails

  const onIncreaseQuantity = () => setDishQuantity(prev => prev + 1)
  const onDecreaseQuantity = () => {
    if (dishQuantity > 0) {
      setDishQuantity(prev => prev - 1)
    }
  }

  const getQuantity = () => {
    console.log('cartItems', cartItems)
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const handleAddItemToCart = () => {
    console.log('handleAddItemToCart')
    addItemToCart({...dishDetails, quantity: dishQuantity})
  }

  const renderControllerButton = () => {
    const orderedQuantity = getQuantity()
    return (
      <div className="order-buttons-container">
        <div className="controller-container d-flex align-items-center bg-success mr-3">
          <button className="button" type="button" onClick={onDecreaseQuantity}>
            -
          </button>
          <p className="quantity">{dishQuantity}</p>
          <button className="button" type="button" onClick={onIncreaseQuantity}>
            +
          </button>
        </div>
        {dishQuantity > 0 && (
          <button
            className="btn btn-primary "
            type="button"
            onClick={handleAddItemToCart}
          >
            ADD TO CART
          </button>
        )}
      </div>
    )
  }

  return (
    <li className="mb-3 p-3 dish-item-container d-flex">
      <div
        className={`veg-border ${dishType === 1 ? 'non-veg-border' : ''} me-3`}
      >
        <div className={`veg-round ${dishType === 1 ? 'non-veg-round' : ''}`} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {addonCat.length !== 0 && (
          <p className="addon-availability-text">Customizations available</p>
        )}
      </div>

      <p className="dish-calories text-warning">{dishCalories} calories</p>
      <img className="dish-image" alt={dishName} src={dishImage} />
    </li>
  )
}

export default DishItem
