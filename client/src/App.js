import './App.css';
import Home from './components/Home.jsx';
import Landing from './components/Landing.jsx';
import Details from './components/Details.jsx';
import Form from './components/Form.jsx';
import NavBar from './components/NavBar.jsx';
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
