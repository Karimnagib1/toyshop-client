import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './../components/Header/Header';
import Footer from './../components/Footer/Footer';
import Cart from './../features/Cart/Cart';
import Login from './../features/Login/Login';
import Products from './../features/Products/Products';
import Signup from './../features/Signup/Signup';
import AddProduct from '../features/AddProduct/AddProduct';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />  
            <Routes>
              <Route path = "/" element = {<Products />}/>
              <Route path = "/products" element = {<Products />}/>
              <Route path= "/Cart" exact element = {<Cart />} />
              <Route path= "/login" exact element = {<Login />} />
              <Route path= "/cart" exact element = {<Cart />} />
              <Route path= "/add-product" exact element = {<AddProduct />} />

              <Route path= "/signup" exact element = {<Signup />} /> 
            </Routes> 

        <Footer />
      </Router>

    </div>
  );
}

export default App;
