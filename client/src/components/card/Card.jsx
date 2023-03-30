import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";




const Card = ({ id, name, image, types }) => {


   return (
      <StyledCard> <Link style={{textDecoration:'none'}} to={`/detail/${id}`}>
         <Name>{name}</Name>
         <Img src={image} alt={`imagen de ${name}`} />
         <Spec>
            <H2 >{types.toString().replace(/,/g, " - ")}</H2>
         </Spec>    
      </Link></StyledCard>
   );
}

export default Card

const StyledCard = styled.div`
   display:flex;
   flex-direction: column;
   position:sticky;
   max-width:15%;
   min-width:200px;
   min-height:250px;
   border: solid gray 2px;
   border-radius: 30px;
   background: white;
   margin:15px;
   box-shadow: 5px 4px 6px 0px #253f9a, 5px 5px 10px 1px #000;
   &:hover{
      transform: translateY(-3%) 
   }
`

const Name = styled.h2`
   color: #253f9a;
   border-radius:5px;
   bottom:1%;
   padding: 5px;
   margin-left: 3px;
   font-size: 18px;
   text-transform: uppercase;
`
const Spec = styled.div`
   display: flex;
   justify-content:space-around;
`
const Img = styled.img`
   padding-top: 5px;
   width: 150px;
   height: 150px;
`
const H2 = styled.h2`
   font-family: Arial, Helvetica, sans-serif;
   font-size: 18px;
   font-weight: lighter;
   text-transform: capitalize;
`