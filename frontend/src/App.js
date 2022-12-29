import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ShippingScreen from './screens/ShippingScreen'
import OrderScreen from './screens/OrderScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import AllOrdersScreen from './screens/AllOrdersScreen'
import ProductListScreen from './screens/ProductListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/admin/orders' component={AllOrdersScreen} />
          <Route path='/admin/productlist' component={ProductListScreen} />
          <Route path='/orders' component={MyOrdersScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
