import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPoke } from '../redux/actions.js'


const Form = () => {

    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)


    useEffect(() => {
        dispatch(getTypes())
    }, [])




    function validate(inputs) {
        const regex =/^[A-Z]+$/i

                 let errors = {}
                if (!regex.test(inputs.name)) errors.name = 'Se requiere un nombre valido'
                if (!inputs.image) errors.image = 'Se requiere una imagen'
                if (inputs.hp <  1||inputs.hp >  100) errors.hp = 'Sólo números entre 1 y 100'
                if (inputs.attack <  1||inputs.attack >  100) errors.attack = 'Sólo números entre 1 y 100'
                if (inputs.defense <  1||inputs.defense >  100) errors.defense = 'Sólo números entre 1 y 100'
                if (inputs.speed <  1||inputs.speed >  100) errors.speed = 'Sólo números entre 1 y 100'
                if (inputs.height <  1||inputs.height >  100) errors.height = 'Sólo números entre 1 y 100'
                if (inputs.weight <  1||inputs.weight >  100) errors.weight = 'Sólo números entre 1 y 100'
                if(!inputs.types.length ||inputs.types.length >3) errors.types = 'Seleccione entre 1 y 3 tipos'
                return errors 
    }

    const [inputs, setInputs] = React.useState({
        name: "",
       image:"",
       hp:0,
       attack:0,
       defense:0,
       speed:0,
       height:0,
       weight:0,
       types:[]

    })

    const [errors, setErrors] = React.useState({
        name: "",
        image:"",
        hp:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        types:""
    })


    const handleChange = (e) => {
            setInputs({ ...inputs, [e.target.name]: e.target.value })
             setErrors(validate({ ...inputs, [e.target.name]: e.target.value })) 
    }

    const handleChangeCheck=()=>{
       let checkboxes = document.getElementById("form").types;
       let types=[]
       for (let i= 0; i < checkboxes.length;i++) {
        if (checkboxes[i].checked) {
         types.push(checkboxes[i].value)
        }
       }
       setInputs({ ...inputs, types})
    }


    const handleSubmit = (e) => {
          e.preventDefault()

         
      
          let errores = Object.entries(errors)
          if (errores.length < 1) {
           dispatch(postPoke(inputs))
         
              alert('Datos completos')
    
          } else alert('Debes corregir los errores')

    }




    return (
        <div>
            <div  >
                <form id='form' onSubmit={handleSubmit}>
                    <div>
                        <label >Nombre:</label>
                        <input className={errors.name && 'warning'} name='name' placeholder='Escribe el nombre...' type={'text'} value={inputs.name} onChange={handleChange} ></input>
                        <p className='danger'>{errors.name}</p>
                        <label >Imagen:</label>
                        <input className={errors.email && 'warning'} name='image' placeholder='Ingrese la url...' type={'text'} value={inputs.image} onChange={handleChange}></input>
                        <p className='danger'>{errors.image}</p>
                        <label >Vida:</label>
                        <input className={errors.phone && 'warning'} name='hp' type={'number'} value={inputs.hp} onChange={handleChange}></input>
                        <p className='danger'>{errors.hp}</p>
                        <label >Ataque:</label>
                        <input className={errors.subject && 'warning'} name='attack' type={'number'} value={inputs.attack} onChange={handleChange}></input>
                        <p className='danger'>{errors.attack}</p>
                        <label >Defensa:</label>
                        <input className={errors.message && 'warning'} name='defense' type={'number'} value={inputs.defense} onChange={handleChange}></input>
                        <p className='danger'>{errors.defense}</p>
                        <label >Velocidad:</label>
                        <input className={errors.message && 'warning'} name='speed' type={'number'} value={inputs.speed} onChange={handleChange}></input>
                        <p className='danger'>{errors.speed}</p>
                        <label >Altura:</label>
                        <input className={errors.message && 'warning'} name='height' type={'number'} value={inputs.height} onChange={handleChange}></input>
                        <p className='danger'>{errors.height}</p>
                        <label >Peso:</label>
                        <input className={errors.message && 'warning'} name='weight' type={'number'} value={inputs.weight} onChange={handleChange}></input>
                        <p className='danger'>{errors.weight}</p>

                    </div>


                    <fieldset>
                        <legend>Elige los tipos de tu pokemon:</legend>
                        {types.map(type => {

                            return <div key={type.id}>
                                <input type="checkbox" name="types" value={type.id} onChange={handleChangeCheck} />
                                <label >{type.name}</label>
                            </div>
                        })}
                        <p className='danger'>{errors.types}</p>


                    </fieldset>



                    <p className='danger'>{errors.message}</p>




                    <button type="submit" >Enviar</button>
                </form>
            </div>


        </div >
    )
}

export default Form