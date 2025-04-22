import Header from "./components/Header"
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import HomeScreen  from './screens/HomeScreen'
import ProductScreen  from './screens/ProductScreen'
import { BrowserRouter, Routes, Route,Router } from "react-router-dom";
import CartScreen from './screens/CartScreen'
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UpdateScreen from "./screens/UpdateScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrder";

function App() {
  return (
    <BrowserRouter>
        <Header/>
          <main className="py-3">
            <Container>
              <Routes>
                <Route path="/" element={<HomeScreen/>}/>
                <Route path="/product/:id" element={<ProductScreen/>}/>
                <Route path="/cart/:id?" element={<CartScreen/>}/>
                <Route path="/login/" element={<LoginScreen/>}/>
                <Route path="/register/" element={<RegisterScreen/>}/>
                <Route path="/profile/" element={<UpdateScreen/>}/>
                <Route path="/shipping/" element={<ShippingScreen/>}/>
                <Route path="/payment/" element={<PaymentScreen/>}/>
                <Route path="/placeorder/" element={<PlaceOrderScreen/>}/>

              </Routes>
            </Container>
          </main>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
