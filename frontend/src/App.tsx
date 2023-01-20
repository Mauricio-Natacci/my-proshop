import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import './App.css';
import HomeScreen from './screens/HomeScreen'
import Header from './components/Header';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Footer from './components/Footer';
import ShippingScreen from './screens/ShippingScreen';
import LoginScreen from './screens/LoginScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';


function App() {

  return (
    <Router>
      <Header>
        <main className='py-3'>
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
          </Container>
        </main>
        <Footer />
      </Header>


    </Router>
  );
}

export default App;