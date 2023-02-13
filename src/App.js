import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = product => {
    const {cartList} = this.state
    const newList = cartList.filter(item => item.id !== product.id)
    this.setState({cartList: newList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const checkList = cartList.filter(item => item.id === product.id)
    //   TODO: Update the code here to implement addCartItem
    if (cartList.length > 0 && checkList.length > 0) {
      const sameProduct = cartList.map(item =>
        item.id === product.id
          ? {
              id: item.id,
              availability: item.availability,
              brand: item.brand,
              description: item.description,
              imageUrl: item.imageUrl,
              price: item.price,
              quantity: item.quantity + product.quantity,
              totalReviews: item.totalReviews,
              title: item.title,
              rating: item.rating,
            }
          : item,
      )
      this.setState({cartList: [...sameProduct]})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state

    //   TODO: Update the code here to implement addCartItem
    const sameProduct = cartList.map(item =>
      item.id === product.id
        ? {
            id: item.id,
            availability: item.availability,
            brand: item.brand,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: item.quantity + 1,
            totalReviews: item.totalReviews,
            title: item.title,
            rating: item.rating,
          }
        : item,
    )

    this.setState({cartList: [...sameProduct]})
  }

  decrementCartItemQuantity = product => {
    const {cartList} = this.state

    const newCartList = cartList.map(item =>
      item.id === product.id && item.quantity > 0
        ? {
            id: item.id,
            availability: item.availability,
            brand: item.brand,
            description: item.description,
            imageUrl: item.imageUrl,
            price: item.price,
            quantity: item.quantity - 1,
            totalReviews: item.totalReviews,
            title: item.title,
            rating: item.rating,
          }
        : item,
    )
    const finalCartList = newCartList.filter(item => item.quantity > 0)
    this.setState({cartList: [...finalCartList]})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
