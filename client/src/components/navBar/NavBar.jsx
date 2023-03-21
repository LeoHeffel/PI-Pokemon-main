
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar.jsx";
import styled from "styled-components";


const StyledNav = styled.div`
display: flex;
justify-content:space-around;
padding:20px;
background: rgb(2,0,36);
background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(93,69,140,1) 7%, rgba(0,212,255,1) 100%);
`
const StyledDiv = styled.div`
color: white;
border :solid 2px;
padding: 10px;
text-decoration: none;
border-radius: 10px 40px 40px 10px
`

export default function NavBar() {
    
    return (
        <StyledNav>
            <Link to={'/home'}><StyledDiv>Home</StyledDiv></Link>
            <Link to={'/new'}><StyledDiv>Crear Nuevo</StyledDiv></Link>
            
            <SearchBar />
        </StyledNav>
    )
 }

 