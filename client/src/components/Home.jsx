
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPokes, showNext,showPrevious } from '../redux/actions.js'

import Cards from './Cards.jsx';

function Home() {
  const dispatch = useDispatch()
  const pokes = useSelector((state) => state.showPokes)
  const current = useSelector((state) => state.current)


  const [next, setNext] = useState(true)
  
  const [previous, setPrevious] = useState(false)

  useEffect(() => {
    dispatch(getPokes())
    
  }, [])

  useEffect(() => {
    if (pokes.length == 12) setNext(true)
    if (pokes.length < 12) setNext(false)

  }, [pokes])

   

  useEffect(() => {
    if (current >= 12) setPrevious(true)
    else setPrevious(false)
  }, [current])

  const handleNext=()=>{
    dispatch(showNext(current+12))
  }
  
  const handlePrevious=()=>{
    dispatch(showPrevious(current-12))
  }

  return ( 
    <div className="App">
      
      {pokes.length && <Cards pokes={pokes}></Cards>}
      
      {previous&&<button onClick={handlePrevious}>Previous</button>}
      {next&&<button onClick={handleNext}>Next</button>}


    </div>
  );
}

export default Home;
