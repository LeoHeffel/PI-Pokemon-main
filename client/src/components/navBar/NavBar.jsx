
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";
import styled from "styled-components";



export default function NavBar() {
    
    return (
        <StyledNav>
            <Link style={{textDecoration:'none'}} to={'/home'}><Logo src="/img/logo.png"/> </Link>
            <Link style={{textDecoration:'none'}} to={'/new'}><StyledDiv>Crear Nuevo</StyledDiv></Link>
            
            <SearchBar />
        </StyledNav>
    )
 }

 const StyledNav = styled.div`
min-width: 900px;
display: flex;
justify-content:space-around;
padding:20px;
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(93,69,140,1) 7%, rgba(27,180,182,1) 100%);
`
const StyledDiv = styled.div`
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
const Logo = styled.img`
position: absolute;
top: -2px;
left: 30px;
height: 100px;

`