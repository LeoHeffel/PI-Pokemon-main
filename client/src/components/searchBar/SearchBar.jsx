import { useNavigate} from "react-router-dom";
import { useEffect, useState } from 'react'
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import { searchPoke } from '../../redux/actions.js'


const Button = styled.button`
background: #64dd17;
color: white;
margin-left:20px;
padding: 5px;
font-weight: bold
`
const Input = styled.input`
border-radius: 5px;
padding: 5px
`
const Div= styled.div`
text-align: right;
`

export default function SearchBar() {
   const navigate = useNavigate()
   const [name,setName]=useState("")
   const dispatch = useDispatch()
   const pokeDetail = useSelector((state) => state.detail)
   const regex =/^[A-Z]+$/i

   const handleChange=(e)=>{

      setName(e.target.value)
      
   }

   const handleSearch =()=>{
      
      if(regex.test(name))dispatch(searchPoke(name))
      else window.alert('ingrese un nombre valido') 
   }
   useEffect(() => {
      if(pokeDetail.id){ 
         navigate(`/detail/${pokeDetail.id}`)
      }
      if(pokeDetail.message){
         //navigate error
         alert('no hy con ese nombre')
      }
    }, [pokeDetail])


   return (
      <Div >
         <Input type='text'  placeholder="Buscar"  onChange={handleChange}/>
         <Button onClick={()=>handleSearch()}>Buscar</Button> 
      </Div>
   );
}
