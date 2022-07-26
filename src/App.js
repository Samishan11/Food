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
import Dashboard from './components/admin/Dashboard';
import { ProtectedRoutes, ProtectedAdmin } from './components/protectedroutes/Protected';
import Chat from './components/chat/Chat';
import Pagenotfound from './components/pagenotfound/Pagenotfound';
import Footer from './components/footer/Footer';
import Searchfood from './components/searching/Searchfood';
function App() {
  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  // get user form the token
  const token_data = localStorage.getItem("token")
  const token = parseJwt(token_data)
  const userdata = token
  return (
    <Foodprovider>
      <Router>
        <Navbar token={token}></Navbar>
        <Routes>
          <Route exact path='/login' element={<Login></Login>}></Route>
          <Route exact path='/register' element={<Register></Register>}></Route>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/food' element={<Allfood></Allfood>}></Route>
          <Route exact path='/food/:food' element={<Fooddetail userdata={userdata}></Fooddetail>}></Route>
          <Route exact path='/search/:search' element={<Searchfood userdata={userdata}></Searchfood>}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route exact path='/cart' element={<Cart></Cart>}></Route>
            <Route exact path='/order' element={<OrderStatus></OrderStatus>}></Route>
          </Route>
          <Route exact path='/contact' element={<Contact userdata={userdata}></Contact>}></Route>
          <Route exact path='/otp-verification' element={<Otp></Otp>}></Route>
          <Route exact path='/forgot-password' element={<Forgotpassword></Forgotpassword>}></Route>
          <Route exact path='/reset-password/:token' element={<Resetpassword></Resetpassword>}></Route>
          <Route element={<ProtectedAdmin />}>
            <Route exact path='/admin' element={<Dashboard></Dashboard>}></Route>
          </Route>
          <Route exact path='chat/:roomId' element={<Chat></Chat>}></Route>
          <Route path='*' element={<Pagenotfound></Pagenotfound>}></Route>
        </Routes>
        <Footer></Footer>
      </Router>
    </Foodprovider>
  );
}

export default App;
