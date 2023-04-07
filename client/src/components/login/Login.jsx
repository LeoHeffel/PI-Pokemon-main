import React, { useState,useEffect } from 'react';
import Modal from '../modal/Modal.jsx';
import styled from 'styled-components';
import { LoginOrRegister,clearError ,setUser} from '../../redux/actions.js';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Login() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    let url= window.location.pathname
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')
    let login = url ==='/login'
    let lor = login? "login":"register"
    const axiosError = useSelector((state) => state.err)
    const axiosSuccess = useSelector((state) => state.user)

    useEffect(() => {
        if (axiosError) {
            setMessage(axiosError)
            setImage('/img/pikachuno.png')
            setModal(true)
        }
    }, [axiosError])

    useEffect(() => {
        if (axiosSuccess) {
            sessionStorage.setItem("user",JSON.stringify(axiosSuccess))
            navigate('/home')
        }
    }, [axiosSuccess])

    useEffect(() => {
        if(sessionStorage.getItem("user")){
            let user = JSON.parse(sessionStorage.getItem("user")) 
            dispatch(setUser(user))
            navigate('/home')
        }
    }, [])



    const [inputs, setInputs] = useState({
        username: "",
        password:""
    })
  const [errors, setErrors] = useState({
    username: "",
    password: ""
})


const handleClose = () => {
    dispatch(clearError())
    setModal(false)
}


function validate(inputs) {
    const regex = /^[A-Z]+$/i
    let errors = {}
    if (!regex.test(inputs.username)) errors.name = 'Se requiere un nombre valido'
    if (inputs.password.length < 5) errors.pass = 'Se requiere un password de mas de 4 carateres'
    return errors
}
const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
}
  const handleSubmit = (e) => {
    e.preventDefault();
    let errores = Object.entries(errors)
        if (errores.length < 1) {
            dispatch(LoginOrRegister(inputs,lor))
           
        } else {
            setMessage(`Completa correctamente los campos`)
            setImage('/img/pikachuno.png')
            setModal(true)
        }
  };

  return (<Background>
    {modal && <Modal message={message} img={image} onClose={handleClose}> </Modal>}
    <Container >
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <Input type="text" name='username'value={inputs.username} onChange={handleChange} />
      </label>
      <P >{errors.name}</P>
      <br />
      <label>
        Password:
        <Input type="password" name='password' value={inputs.password} onChange={handleChange} />
      </label>
      <P >{errors.pass}</P>
      <br />
      {login?<Button type="submit">Ingresar</Button>:<Button type="submit">Registrarse</Button>}
    {login?<Link to={'/register'}>Desea Registrarse?</Link>:<Link to={'/login'}>Ya esta Registrado?</Link>}
    </form>
    
  </Container>
  </Background>);
}

export default Login;



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
    margin: 5px;
    font-size: 16px;
    border-width: 1px;
    -moz-appearance:textfield;
    background-color: #FFFFFF;
    color: #000000;
    border-style: solid;
    border-radius: 12px;
    box-shadow: 0px 0px 5px rgba(66,66,66,.75);
    text-shadow: 0px 0px 5px rgba(66,66,66,.75);
 
`
const P = styled.p`
    font-size: 10px; 
    color: red;
    text-align: center;
`


const Container = styled.div`

    display : flex;
    width: 75vw;
    margin-top: 100px;
    margin-left:auto;
    margin-right:auto;
    justify-content:center;
    min-width: 600px;
`

const Background = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0px;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url('/img/bg.jpg');
`