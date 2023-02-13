// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const prices = cartList.map(item => item.price * item.quantity)
      const total = prices.reduce((acc, currValue) => acc + currValue)

      return (
        <div className="summary">
          <div className="summary-container">
            <div className="summary-card-total-box">
              <h1 className="total-price-title">Order Total:</h1>
              <p className="total-price">Rs {total}/-</p>
            </div>
            <p className="total-items">{prices.length} Items in cart</p>
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
