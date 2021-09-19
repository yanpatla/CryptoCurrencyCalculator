import React, { Fragment, useState } from "react";
import styled from '@emotion/styled';

const Label = styled.label `
font-family:'Bebas Neue',cursive;
color: #fff;
text-transform:uppercase;
font-weight: bold;
font-size:2.4rem;
margin-top:2rem;
display:block;

`;

const Select =styled.select `
width:100%;
display:block;
padding:1rem;
-webkit-appearance:none;
 border-radius:10px;
 border:none;
 font-size:1.2rem;

`;

//!Sate y Otras operaciones
const useCriptomoneda = (label,stateinicial,opciones) => {
   
//* State de Nuestro Custom Hook

const [state, actualizarState] = useState(stateinicial)

  //? Lo que se va a Mostrar en Pantalla
  const SeleccionarCripto = () => (
    <Fragment>
      <Label htmlFor="moneda">{label}</Label>
      <Select onChange={ e => actualizarState(e.target.value) }  value= {state}>
       <option value="">--Seleccione--</option>
       {opciones.map(opcion=> ( //? Cuando Estas Utilizando el Map siempre requires de un Key que sea Unico
          <option key={opcion.CoinInfo.id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
       ))}
      </Select>
    </Fragment>
  );


  //!Retornar State, Interfaz y Func que Modifica el State

  return [state, SeleccionarCripto, actualizarState];
};

export default useCriptomoneda;


