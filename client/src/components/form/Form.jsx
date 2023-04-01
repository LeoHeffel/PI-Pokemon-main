
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postPoke, clearError } from '../../redux/actions.js'
import Modal from '../modal/Modal.jsx';
import styled from 'styled-components';


const Form = () => {

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const axiosError = useSelector((state) => state.err)
    const axiosSuccess = useSelector((state) => state.newPoke)


    useEffect(()=>{
        return reset()
    },[])


    useEffect(() => {
        if (axiosError) {
            setMessage(axiosError)
            setImage('/img/pikachuno.png')
            setModal(true)
        }
    }, [axiosError])

    useEffect(() => {
        if (axiosSuccess) {
            setMessage(`${axiosSuccess} creado!!`)
            setImage('/img/pikachuok.png')
            setModal(true)
        }
    }, [axiosSuccess])



    function reset() {
        setErrors({
            name: "",
            image: "",
            hp: "",
            attack: "",
            defense: "",
            speed: "",
            height: "",
            weight: "",
            types: ""
        })
        setInputs({
            name: "",
            image: "",
            hp: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: []
        })
        let checkboxes = document.getElementById("form").types;
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }
        dispatch(clearError())
        setModal(false)
    }






    function validate(inputs) {
        const regex = /^[A-Z]+$/i
        let errors = {}
        if (!regex.test(inputs.name)) errors.name = 'Se requiere un nombre valido'
        if (!inputs.image) errors.image = 'Se requiere una imagen'
        if (inputs.hp < 1 || inputs.hp > 200) errors.hp = 'Sólo números entre 1 y 200'
        if (inputs.attack < 1 || inputs.attack > 200) errors.attack = 'Sólo números entre 1 y 200'
        if (inputs.defense < 1 || inputs.defense > 200) errors.defense = 'Sólo números entre 1 y 200'
        if (inputs.speed < 1 || inputs.speed > 200) errors.speed = 'Sólo números entre 1 y 200'
        if (inputs.height < 1 || inputs.height > 200) errors.height = 'Sólo números entre 1 y 200'
        if (inputs.weight < 1 || inputs.weight > 200) errors.weight = 'Sólo números entre 1 y 200'
        if (!inputs.types.length || inputs.types.length > 3) errors.types = 'Seleccione entre 1 y 3 tipos'
        return errors
    }

    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')

    const [inputs, setInputs] = useState({
        name: "",
        image: "",
        hp: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    const [errors, setErrors] = useState({
        name: "",
        image: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        height: "",
        weight: "",
        types: ""
    })


    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
        setErrors(validate({ ...inputs, [e.target.name]: e.target.value }))
    }

    const handleChangeCheck = () => {
        let checkboxes = document.getElementById("form").types;
        let types = []
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                types.push(checkboxes[i].value)
            }
        }
        setInputs({ ...inputs, types })
        setErrors(validate({ ...inputs, types }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        let errores = Object.entries(errors)
        if (errores.length < 1) {
            dispatch(postPoke(inputs))
            reset()
        } else {
            setMessage(`Completa correctamente los campos`)
            setImage('/img/pikachuno.png')
            setModal(true)
        }
    }

    const handleClose = () => {
        dispatch(clearError())
        setModal(false)
    }

    return (<>
        {modal && <Modal message={message} img={image} onClose={handleClose}> </Modal>}
        <div  >
            <form id='form'>
                <Container >
                    <FieldSet>
                        <Legend>Ingresa los datos de tu Pokémon:</Legend>
                        <FieldDiv>
                            <label >Nombre:</label>
                            <Input name='name' placeholder='Escribe el nombre...' type={'text'} value={inputs.name} onChange={handleChange} ></Input>
                        </FieldDiv>
                        <P >{errors.name}</P>
                        <FieldDiv>
                            <label >Imagen:</label>
                            <Input name='image' placeholder='Ingrese la url...' type={'text'} value={inputs.image} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P>{errors.image}</P>
                        <FieldDiv>
                            <label >Vida:  </label>
                            <Input name='hp' type={'number'} value={inputs.hp} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.hp}</P>
                        <FieldDiv>
                            <label >Ataque:</label>
                            <Input name='attack' type={'number'} value={inputs.attack} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.attack}</P>
                        <FieldDiv>
                            <label >Defensa:</label>
                            <Input name='defense' type={'number'} value={inputs.defense} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.defense}</P>
                        <FieldDiv>
                            <label >Velocidad:</label>
                            <Input name='speed' type={'number'} value={inputs.speed} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.speed}</P>
                        <FieldDiv>
                            <label >Altura:</label>
                            <Input name='height' type={'number'} value={inputs.height} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.height}</P>
                        <FieldDiv>
                            <label >Peso:</label>
                            <Input name='weight' type={'number'} value={inputs.weight} onChange={handleChange}></Input>
                        </FieldDiv>
                        <P >{errors.weight}</P>

                    </FieldSet>
                    <FieldSet>
                        <Legend>Elige los tipos de tu Pokémon:</Legend>

                        {types.map(type => {
                            return <div className='check' key={type.id}>
                                <Input type="checkbox" name="types" value={type.id} onChange={handleChangeCheck} />
                                <label className='checkLabel' >{type.name}</label>
                            </div>
                        })}
                        <P >{errors.types}</P>

                    </FieldSet>
                </Container>

            </form>
            <Button className='submit' onClick={handleSubmit} >Enviar</Button>
        </div>
    </>)
}

export default Form

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

const FieldSet = styled.fieldset`
    margin-top: 30px;
    margin-bottom: 30px;
    border-radius: 10px;
    text-align: left; 
    float: left;
`

const Container = styled.div`
    display : flex;
    width: 75vw;
    margin-left:auto;
    margin-right:auto;
    justify-content:center;
    min-width: 600px;
`
const FieldDiv = styled.div`
    display: flex;
    justify-content:end;
    align-items:center;
`

const Legend = styled.legend`
    color:#253f9a;
`