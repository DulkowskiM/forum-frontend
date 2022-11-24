import './App.css';
import Home from './pages/home/Home';
import Admin from './pages/admin/Admin';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import Layout from './components/Layout/Layout';
import Menu from './components/Layout/Menu/Menu';
import Footer from './components/Layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

const menu = <Menu/>

const content = (

  <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/login" element={<Login />} />
     <Route path="/register" element={<Register />} />
     <Route path="/admin" element={<Admin />} />
  </Routes>

)
const footer = <Footer/>
  return (
    <Router>
       <Layout menu={menu} content={content()} footer={footer}/>
    </Router>
  );
}

export default App;
