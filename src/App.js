import logo from './logo.svg';
import './App.css';

import NavbarHeader from './Pages/Navbar';
import SingleProduct from './Pages/SingleProduct';
import Products from './Pages/Products';
import Home from './Pages/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import CartPage from './Pages/CartPage';


function App() {
  return (<>
  <BrowserRouter>
  <Routes>
   {/* <NavbarHeader/> */}
   <Route path='/' element={<NavbarHeader/>}>
   <Route  index  element={<Home/>}/>
    <Route path='/product/:id' element={<Products/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Registration/>}/>
    <Route path='/:Electronics' element={<Home/>}/>
    <Route path='/cart' element={<CartPage/>}/>
    </Route>
  </Routes>

   
    </BrowserRouter>
  </>
   
  );
}

export default App;
