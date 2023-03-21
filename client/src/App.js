import './App.css';
import Home from './components/home/Home.jsx';
import Landing from './components/landing/Landing.jsx';
import Details from './components/details/Details.jsx';
import Form from './components/form/Form.jsx';
import NavBar from './components/navBar/NavBar.jsx';
import { useNavigate, Route, Routes, useLocation } from 'react-router-dom'




function App() {
  const location = useLocation()

  return ( 
    <div className="App">
       {location.pathname !== '/' && <NavBar  />}
      <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/new' element={<Form />} />
          <Route path='/detail/:detailId' element={<Details />} />
        </Routes>
    </div>
  );
}

export default App;
