import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Contact from './components/contact/Contact';
import { Cartprovider } from './components/Context/CardContext';
import { Foodprovider } from './components/Context/FoodContext';
import Fooddetail from './components/detail/Fooddetail';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import OrderStatus from './components/order/OrderStatus';
import Register from './components/register/Register';
import Allfood from './components/food/Allfood';
import Otp from './components/otp/Otp';
import Forgotpassword from './components/Forgotpassword/Forgotpassword';
import Resetpassword from './components/Forgotpassword/Resetpassword';
function App() {
  const token = localStorage.getItem('token')
  return (
    <Foodprovider>
      <Cartprovider>
        <Router>
          <Navbar token={token}></Navbar>
          <Routes>
            <Route exact path='/login' element={<Login></Login>}></Route>
            <Route exact path='/register' element={<Register></Register>}></Route>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/food' element={<Allfood></Allfood>}></Route>
            <Route exact path='/food/:food' element={<Fooddetail></Fooddetail>}></Route>
            {
              token &&
              <>
                <Route exact path='/cart' element={<Cart></Cart>}></Route>
                <Route exact path='/order' element={<OrderStatus></OrderStatus>}></Route>
              </>

            }
            <Route exact path='/contact' element={<Contact></Contact>}></Route>
            <Route exact path='/otp-verification' element={<Otp></Otp>}></Route>
            <Route exact path='/forgot-password' element={<Forgotpassword></Forgotpassword>}></Route>
            <Route exact path='/reset-password/:token' element={<Resetpassword></Resetpassword>}></Route>
          </Routes>
        </Router>
      </Cartprovider>
    </Foodprovider>
  );
}

export default App;
