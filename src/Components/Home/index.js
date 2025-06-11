import {Component} from 'react'

import FoodItem from '../FoodItem'
import Navbar from '../Navbar'

import './index.css'

class Home extends Component {
  state = {
    activeTab: 'Salads and Soup',
    responseData: [],
    cartItems: [],
  }

  componentDidMount() {
    this.getFoodData()
  }

  getUpdatedData = tabData => {
    const updatedTabData = tabData.map(eachObj => ({
      menuCategoryId: eachObj.menu_category_id,
      menuCategoryImage: eachObj.menu_category_image,
      menuCategory: eachObj.menu_category,
      categoryDishes: eachObj.category_dishes.map(eachItem => ({
        dishAvailability: eachItem.dish_Availability,
        dishType: eachItem.dish_Type,
        dishCalories: eachItem.dish_calories,
        dishCurrency: eachItem.dish_currency,
        dishDescription: eachItem.dish_description,
        dishId: eachItem.dish_id,
        dishImage: eachItem.dish_image,
        dishName: eachItem.dish_name,
        dishPrice: eachItem.dish_price,
        addOnCat: eachItem.addonCat,
        dishQunatity: 0,
      })),
    }))
    console.log('updatedData:', updatedTabData)
    return updatedTabData
  }

  getFoodData = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiUrl)
    const jsonData = await response.json()
    console.log('jsondata', jsonData)
    const updatedData = this.getUpdatedData(jsonData[0].table_menu_list)

    if (response.ok) {
      this.setState({
        responseData: updatedData,
      })
    } else {
      console.log('Error while fetching the data')
    }
  }

  onClickedTab = event => {
    console.log('onclicked button')
    this.setState({
      activeTab: event.target.name,
    })
  }

  addItemToCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems?.find(item => item.dishId === dish.dishId)
    console.log('isexisted', isAlreadyExists)
    if (!isAlreadyExists) {
      const newDish = {...dish, quantity: 1}

      this.setState(prevState => ({
        cartItems: [...prevState.cartItems, newDish],
      }))
    } else {
      this.setState(prevState => ({
        cartItems: prevState.cartItems.map(eachItem =>
          eachItem.dishId === dish.dishId
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      }))
    }
  }

  removeItemFromCart = dish => {
    const {cartItems} = this.state
    const isAlreadyExists = cartItems?.find(item => item.dishId === dish.dishId)
    console.log('isexisted', isAlreadyExists)
    if (isAlreadyExists) {
      this.setState(prevState => ({
        cartItems: prevState.cartItems
          .map(item =>
            item.dishId === dish.dishId
              ? {...item, quantity: item.quantity - 1}
              : item,
          )
          .filter(item => item.quantity > 0),
      }))
    }
  }

  // updateQuantity = (dishId, quantity) => {
  //   const {responseData} = this.state
  //   const updatedQunatityResponse = responseData.map(eachItem => ({
  //     ...eachItem,
  //     categoryDishes: eachItem.categoryDishes.map(eachDish =>
  //       eachDish.dishId === dishId ? {...eachDish, quantity} : eachDish,
  //     ),
  //   }))
  //   console.log('updatedQntyResponse:', updatedQunatityResponse)
  //   this.setState({
  //     responseData: updatedQunatityResponse,
  //   })
  // }

  render() {
    const {responseData, activeTab, cartItems} = this.state
    console.log('cartItems:', cartItems)
    // console.log('respo', responseData, activeTab)
    let currentTabDishes = []
    if (responseData.length > 0) {
      currentTabDishes = responseData.filter(
        eachItem => eachItem.menuCategory === activeTab,
      )
    }
    // console.log('currentTabDishes', currentTabDishes)

    return (
      <>
        <Navbar cartItems={cartItems} />
        <div>
          <ul className="tabs-list">
            {responseData.map(eachObj => {
              const activeTabClass =
                activeTab === eachObj.menuCategory
                  ? 'tab-item active-tab-item'
                  : 'tab-item'
              const activeBtnClass =
                activeTab === eachObj.menuCategory
                  ? 'tab-btn active-tab-btn'
                  : 'tab-btn'
              return (
                <li className={activeTabClass} key={eachObj.menuCategoryId}>
                  <button
                    type="button"
                    onClick={this.onClickedTab}
                    name={eachObj.menuCategory}
                    className={activeBtnClass}
                  >
                    {eachObj.menuCategory}
                  </button>
                </li>
              )
            })}
          </ul>
          {currentTabDishes.length === 1 && (
            <ul className="food-items-list">
              {currentTabDishes[0].categoryDishes.map(eachDish => (
                <FoodItem
                  eachDish={eachDish}
                  key={eachDish.dishId}
                  removeItemFromCart={this.removeItemFromCart}
                  addItemToCart={this.addItemToCart}
                  cartItems={cartItems}
                />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }
}
export default Home
