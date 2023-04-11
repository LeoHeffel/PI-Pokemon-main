import './App.css';
import Home from './components/home/Home.jsx';
import Landing from './components/landing/Landing.jsx';
import Details from './components/details/Details.jsx';
import Form from './components/form/Form.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import Error from './components/error/Error.jsx';
import {  Route, Routes, useLocation, Navigate } from 'react-router-dom'
import Login from './components/login/Login.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios'
//axios.defaults.baseURL='http://localhost:3001'
axios.defaults.baseURL='pi-pokemon-main-production-834b.up.railway.app'
function App() {
  const location = useLocation()
  
  const user = useSelector((state) => state.user)
  let path= location.pathname !== '/' &&location.pathname !== '/login'&&location.pathname !== '/register'
  return ( 
    <div className="App">
       {path && <NavBar  />}
      <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register'  element={<Login />} />
          <Route path='/home' element={user?<Home />:<Navigate to={'/login'}/>} />
          <Route path='/new' element={user?<Form />:<Navigate to={'/login'}/>} />
          <Route path='/detail/:detailId' element={user?<Details />:<Navigate to={'/login'}/>} />
    
          <Route path='*' element={<Error error="404" message=' < No hay nada aquí > '/>} />
         
        </Routes>
    </div>
  );
}

export default App;
