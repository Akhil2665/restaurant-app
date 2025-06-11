// import {useState} from 'react'

import './index.css'

const FoodItem = props => {
  // const [qunatity, setQuantity] = useState(0)
  const {eachDish, removeItemFromCart, addItemToCart, cartItems} = props

  // const decreaseQuantity = dishId => {
  //   if (qunatity >= 1) {
  //     setQuantity(prevState => prevState - 1)

  //     updateQuantity(dishId, qunatity - 1)
  //   }
  // }
  const increaseQuantity = () => addItemToCart(eachDish)
  const decreaseQuantity = () => removeItemFromCart(eachDish)

  // const increaseQuantity = dishId => {
  //   updateQuantity(dishId, qunatity + 1)
  //   setQuantity(prevState => prevState + 1)
  // }

  const getQuantity = dishId => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }

  const {
    dishAvailability,
    dishName,
    dishPrice,
    dishCalories,
    dishDescription,
    dishType,
    dishCurrency,
    dishImage,
    dishId,
    // dishQunatity,
    addOnCat,
  } = eachDish
  // console.log('addonlen', addOnCat)
  //  <img src="" className="food-type" alt="meal type" />

  return (
    <li className="food-item" key={dishId}>
      <div className="food-item-details-container">
        {dishType === 2 ? (
          <div className="dish-container veg-dish-container">
            <p className="dish-type-btn veg-btn" />
          </div>
        ) : (
          <div className="dish-container nonveg-dish-container">
            <p className="dish-type-btn nonveg-btn" />
          </div>
        )}

        <div className="food-item-details">
          <h1 className="food-item-name">{dishName}</h1>
          <p className="food-value">
            {dishCurrency} {dishPrice}
          </p>
          <p className="about-food">{dishDescription}</p>
          {!dishAvailability ? (
            <p className="availability">Not Available</p>
          ) : (
            <div className="add-btn-container">
              <button
                type="button"
                className="quantity-btn"
                onClick={() => decreaseQuantity(dishId)}
              >
                -
              </button>
              <p className="quantity">{getQuantity(dishId)}</p>
              <button
                type="button"
                className="quantity-btn"
                onClick={() => increaseQuantity(dishId)}
              >
                +
              </button>
            </div>
          )}

          {addOnCat?.length > 0 && (
            <p className="add-ons">Customizations Available</p>
          )}
        </div>
      </div>
      <div className="calorie-container">
        <p>{dishCalories} calories</p>
      </div>
      <div className="food-image-container">
        <img src={dishImage} alt="food item" className="food-image" />
      </div>
    </li>
  )
}

export default FoodItem
