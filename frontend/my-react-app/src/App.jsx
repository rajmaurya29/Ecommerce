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
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import EditUserScreen from './screens/EditUserScreen'
import ProductListScreen from "./screens/ProductListScreen";
import EditProductScreen from "./screens/EditProductScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";

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
                <Route path="/order/:id" element={<OrderScreen/>}/>
                <Route path="/admin/users/:id/edit" element={<EditUserScreen/>}/>
                <Route path="/admin/users" element={<UserListScreen/>}/>
                <Route path="/admin/orders" element={<AdminOrderScreen/>}/>
                <Route path="/admin/products" element={<ProductListScreen/>}/>
                <Route path="/admin/products/create" element={<CreateProductScreen/>}/>
                <Route path="/admin/products/:id/edit" element={<EditProductScreen/>}/>
                

              </Routes>
            </Container>
          </main>
        <Footer/>
    </BrowserRouter>
  )
}

export default App
