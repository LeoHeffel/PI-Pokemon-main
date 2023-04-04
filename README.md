![HenryLogo](https://d31uz8lwfmyn8g.cloudfront.net/Assets/logo-henry-white-lg.png)


# PI Pokémones - Leonardo F. Heffel

Este Proyecto Individual consiste en una SPA realizada con React, un Backend realizado con Express y una DB de PostgreSql

## Consta de las siguientes secciones:

 - [Front End](")
 - [Back End](")
 - [Databases](")


## Features Frontend

- Landing Page sencilla.
- Control de duplicación de nombres al agregar nuevo pokémon .
- Contol de nombre válido al agregar o buscar pokémon.
- Control de datos de formulario antes de enviar.
- Alerta de pokémon inexistente.
- Búsqueda por Id al seleccionar una card.
- Filtrado por origen(api externa o BD ), o por tipo.
- Ordenamientos : Alfabetico y por Ataque (ascendente y descendente).
- Paginado dinámico en base a la cantidad de pokemones a mostrar .
- Control de render de elementos vacios. 
- Manejo de errores provenientes tanto del Front asi como del Back (notificación con detalles minimos).
- Manejo de estados globlales con Redux .
- Integracion de todas las peticiones al back.
- Estilado con styled-Component.

## Features Backend
- Conexión a base de datos PostgreSql a travez del ORM Sequelize
- Busca todos los nombres de Pokémones de la API externa y los mantiene en memoria ( para agilizar la busqueda por nombre y para evitar crear duplicados).
- Trae una cantidad predetermindada de 150 Pokémones desde la API externa y los almacena en un array con sus propiedades basicas (a modo de cache para evitar repetir peticiones innecesarias  a la API externa ganando performance en las repuestas).
- Comprueba si en la BD existen los tipos creados y de lo contrario los busca en la API extena y los almacena.
- Modularizado en Rutas/Controladores/Manejadores.
- Manejo de errores con try/catch -> envio del mensaje de error al front.
- Envio error de request ruta inexistente.

## Features Databases
- Creada con el nombre pokemon
- Contiene tablas pokemons , types y una auxiliar llamada poke_types
- Pokemons contiene id(uuid autogenerado, PK), name(unico,varchar, requerido),image(varchar, requerido),hp(int, requerido),attack(int, requerido),defense(int, requerido),speed(int, requerido),height(int, requerido),weight(int, requerido), y los timestamp deshabilitados
- Types contiene id(int, autoincrementable, PK) name(unico,varchar, requerido)
- Poke_types contiene las relaciones entre las dos tablas a traves de las PK
## API Reference

#### Get Pokémons

```http
  GET /pokemons/
```
*   Returns an array with all pokes(BD and API) 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `?name=""` | `string` | **Query, Optional**. Your pokemon name |

* Returns an object with details  found or a not found message



#### Get Pokémons ID

```http
  GET /pokemons/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Your pokemon id |

* Returns object whith pokemon details or error if not found


#### Post Pokemon

```http
  POST /pokemons/
```

Adds a Pokemon recived by body,

* Returns object whith created pokemon or error if a property is missing or name already exist in DB or external API

#### Get Types

```http
  GET /types/
```
* Returns an array with all types of pokemons

## Installation

Install my-project with pnpm

to start Backend
```bash
  cd back
  pnpm start (open with nodemon)
  port: 3001
```
to start FrontEnd
```bash
  cd front
  pnpm start (open with react-scripts)
  port:3000
```


<br />

<div align="center" >
<img src="./pokemon.png" alt="" />
</div>

<br />