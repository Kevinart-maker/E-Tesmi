import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import './styles/home.css'
import './styles/shopcards.css'
import './styles/productcards.css'
import './styles/content.css'
import './styles/features.css'
import './styles/footer.css'
import './styles/login.css'
import './styles/breadcrumbs.css'
import './styles/productdetail.css'
import './styles/products.css'
import './styles/productlist.css'
import './styles/filters.css'
import './styles/cart.css'
import './styles/checkout.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './pages/Index'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductList from './pages/ProductList'
import Cart from './components/Cart'

import { useAuthContext } from './hooks/useAuthContext';
import PaymentPage from './pages/PaymentPage'
import CheckoutForm from './pages/CheckoutForm'
import Contact from './pages/Contact'


function App() {
  const { user } = useAuthContext()
  user && console.log('logged user', user.email)

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Index />}/>
        <Route path='login' element={!user ? <Login /> : <Navigate to='/' />}/>
        <Route path='products/:id' element={<Products />}/>
        <Route path='productlist' element={<ProductList />}/>
        <Route path='cart' element={<Cart />}/>
        <Route path='checkout' element={<CheckoutForm />}/>
        <Route path='contact' element={<Contact />}/>
        <Route path='payment/:orderId' element={<PaymentPage />}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
