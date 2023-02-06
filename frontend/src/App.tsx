import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css'
import { HomeScreen } from './screens/HomeScreen'
import { Header } from './components/Header'
import { ProductScreen } from './screens/ProductScreen'
import { CartScreen } from './screens/CartScreen'
import { Footer } from './components/Footer'
import { ShippingScreen } from './screens/ShippingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { PlaceOrderScreen } from './screens/PlaceOrderScreen'
import { OrderScreen } from './screens/OrderScreen'
import { AllOrdersScreen } from './screens/AllOrdersScreen'
import { MyOrdersScreen } from './screens/MyOrdersScreen'
import { ProductEditScreen } from './screens/ProductEditScreen'
import { ProductListScreen } from './screens/ProductListScreen'
import { RegisterScreen } from './screens/RegisterScreen'

export function App() {
  return (
    <Router>
      <Header>
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/admin/orders" component={AllOrdersScreen} />
            <Route path="/admin/productlist" component={ProductListScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/orders" component={MyOrdersScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/register" component={RegisterScreen} />
          </Container>
        </main>
        <Footer />
      </Header>
    </Router>
  )
}
