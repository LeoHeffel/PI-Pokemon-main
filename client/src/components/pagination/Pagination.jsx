
import styled from 'styled-components';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { showNext, showPrevious, showPage } from '../../redux/actions.js'


const Button = styled.button`
  
  box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:${props => props.color || "linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%)"};
	border-radius:6px;
	border:1px solid #dcdcdc;
	display:inline-block;
	cursor:pointer;
	color:#777777;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffffff;
    
  &:hover{
    background:${props => props.color || "linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%)"};
  }
  &:active{
    position:relative;
    top:1px;
  }
`

const Pagination = () => {

  const dispatch = useDispatch()
  const pokesRedux = useSelector((state) => state.showPokes)
  const current = useSelector((state) => state.current)
  const unfiltered = useSelector((state) => state.pokes)


  const [next, setNext] = useState(true)
  const [previous, setPrevious] = useState(false)


  useEffect(() => {
    if (pokesRedux.length === 12) setNext(true)
    if (pokesRedux.length < 12) setNext(false)
  }, [pokesRedux])



  useEffect(() => {
    if (current >= 1) setPrevious(true)
    else setPrevious(false)
  }, [current])


  const handleNext = () => {
    dispatch(showNext())
  }

  const handlePage = (e) => {
    dispatch(showPage(e.target.value - 1))
  }
  const handlePrevious = () => {
    dispatch(showPrevious())
  }

  let pageNumbers = []
  for (let i = 1; i <= Math.ceil(unfiltered.length / 12); i++) {
    pageNumbers.push(i);
  }


  return (
    <div>
      {previous ? <Button onClick={handlePrevious}>←</Button> : <Button disabled color='white' >←</Button>}
      {pageNumbers.map(number => number !== current + 1 ? <Button key={number} value={number} onClick={handlePage}>{number}</Button> : <Button key={number} value={number} disabled color='white'>{number}</Button>)}
      {next ? <Button onClick={handleNext} >→</Button> : <Button disabled color='white' >→</Button>}
    </div>


  )
}

export default Pagination

