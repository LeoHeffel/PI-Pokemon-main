import React from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";


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
margin:15px
`

const Button = styled.button`
background: red;
color: white;
border-radius: 3px;
align-self: flex-end;
margin: 2px;
`
const Name = styled.h2`
background: black;
opacity: 55%;
color: white;
border-radius:5px;
position:absolute; 
bottom:1%;
padding: 5px;
margin-left: 3px;
font-size: 18px;
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

`

const  Card = ({ id, name, image, types }) => {


   return (
      <StyledCard>
            <Name>{name.toUpperCase()}</Name>
         <Link to={`/detail/${id}`}>
            <Img src={image} alt={`imagen de ${name}`}/>
         </Link>
            <Spec>
               <H2 >{types.toString().replace(/,/g," - ")}</H2>
            </Spec>
      </StyledCard>
   );
}

export default  Card

