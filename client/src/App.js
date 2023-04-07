import './App.css';
import Home from './components/home/Home.jsx';
import Landing from './components/landing/Landing.jsx';
import Details from './components/details/Details.jsx';
import Form from './components/form/Form.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import Error from './components/error/Error.jsx';
import {  Route, Routes, useLocation } from 'react-router-dom'
import Login from './components/login/Login.jsx';



function App() {
  const location = useLocation()
  let path= location.pathname !== '/' &&location.pathname !== '/login'&&location.pathname !== '/register'

  return ( 
    <div className="App">
       {path && <NavBar  />}
      <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/new' element={<Form />} />
          <Route path='/detail/:detailId' element={<Details />} />
         
          <Route path='*' element={<Error error="404" message=' < No hay nada aquí > '/>} />
         
        </Routes>
    </div>
  );
}

export default App;
