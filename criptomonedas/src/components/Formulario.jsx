import React,{useEffect,useState} from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
import Error from './Error'
import axios from "axios";
const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {
//State del Listado de Crypto
const [listacripto, guardarCriptomonedas] = useState([]);

const [error, guardarError] = useState(false);


  const MONEDAS = [
    {
      codigo: "USD",
      nombre: "Dolar de Estado Unidos",
    },
    {
      codigo: "ARS",
      nombre: "Peso Argentino",
    },
    {
      codigo: "EUR",
      nombre: "Euro",
    },
    {
      codigo: "GBP",
      nombre: "Libra Esterlina",
    },
  ];

  //Utilizar useMoneda

  const [moneda, SelectMonedas] = useMoneda(
    "Elige tu Moneda", //!LABEL
    "",//*STATEINICIAL
    MONEDAS//?OPCIONES
  ); //No necesariamente debe tener el mismo nombre Este array destructuring lo que esta haciendo es agarrarlos en el orden que se retornan //!No es necesario el actualizarState pero pudeo ponerlo igual

//UTILIZAR CRYPTO MONEDA
const [criptomoneda, SeleccionarCripto] = useCriptomoneda('Elige tu Criptomoneda','',listacripto);

//Ejecutar llamado a la API
useEffect(() => {
 const consultarAPI = async ()=> {
   const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
   const resultado = await axios.get(URL);
   guardarCriptomonedas(resultado.data.Data);
 }
 consultarAPI()
}, [])
 //Cuadno el Usuario Hace Submit
const cotizarMoneda = (e) => {
  e.preventDefault();

  //Validar si los Campost estan completos
  if(moneda ==='' || criptomoneda === ''){
    guardarError(true);
    return;

  }

//pasar los datos al componente principal

guardarError(false)

guardarMoneda(moneda);
guardarCriptomoneda(criptomoneda);


}


  return (
    <form onSubmit={cotizarMoneda}>
      {error  ? <Error mensaje="Todos los Campost son Obvligatorios"/> : null}
      <SelectMonedas />
      <SeleccionarCripto/>
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
