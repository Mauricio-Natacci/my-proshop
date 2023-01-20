import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from './reducers/userReducers'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { CartItem, SaveShippingAddressProps } from './actions/cartActions'


const reducer = combineReducers({
  userLogin: userLoginReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') || '')
    : null

const cartItemsFromStorage: CartItem[] = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems') || '')
    : [] 
  
const shippingAddressFromStorage: SaveShippingAddressProps = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress') || '')
    : {}
      

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
) 

export default store
