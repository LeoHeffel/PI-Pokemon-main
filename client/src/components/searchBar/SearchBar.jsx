import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { searchPoke } from '../../redux/actions.js'
import Modal from "../modal/Modal.jsx";


export default function SearchBar() {
   const navigate = useNavigate()
   const [name, setName] = useState("")
   const [modal, setModal] = useState(false)
   const [message, setMessage] = useState('')


   const dispatch = useDispatch()
   const pokeDetail = useSelector((state) => state.detail)
   const regex = /^[A-Z]+$/i

   const handleChange = (e) => {
      setName(e.target.value)
   }

   const handleSearch = () => {

      if (regex.test(name)) {
         dispatch(searchPoke(name))
         
      }   
      else {
         setMessage('Ingrese un nombre válido')
         setName('')
         setModal(true)
      }
   }
   useEffect(() => {
      if (pokeDetail.id) {
         navigate(`/detail/${pokeDetail.id}`)
      }
      if (pokeDetail.message) {
         setMessage(`No se encontró "${name}"`)
         setName('')
         setModal(true)
      }
   }, [pokeDetail])
   const handleClose = () => {
      setModal(false)
  }

   return (<>
       {modal &&  <Modal message={message} img={'/img/pikachuno.png'}  onClose={handleClose}> </Modal>}
      <Div >
         <Input type='text' placeholder="Buscar" value={name} onChange={handleChange} />
         <Button onClick={() => handleSearch()}>Buscar</Button>
      </Div>
   </>);
}

const Button = styled.button`
   margin:10px;
   box-shadow:inset 0px 1px 0px 0px #ffffff;
	background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
	background-color:#ededed;
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
    background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	  background-color:#dfdfdf;
  }
  &:active{
    position:relative;
    top:1px;
  }
`
const Input = styled.input`
   padding: 5px;
   font-size: 16px;
   border-width: 1px;  
   background-color: #FFFFFF;
   color: #000000;
   border-style: solid;
   border-radius: 12px;
   box-shadow: 0px 0px 5px rgba(66,66,66,.75);
   text-shadow: 0px 0px 5px rgba(66,66,66,.75);
`
const Div = styled.div`
   text-align: right;
`