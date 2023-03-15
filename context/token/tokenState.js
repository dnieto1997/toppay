import React,{useReducer} from 'react';

import TokenReducer from './tokenReducer';
import TokenContext from './tokenContext';
import { OBTENER_TOKEN } from '../../types/Index';
const TokenState = props =>{

    // crear state inicial
     const initialState ={
        token:[]
     }

   // use reducer con dispatch

   const [state,dispatch] = useReducer(TokenReducer,initialState)

  const obtenerToken =() =>{
   
    dispatch({

      type:OBTENER_TOKEN
    })


  }




    return(

        <TokenContext.Provider value={{
            token: state.token,
            obtenerToken
        }}>

          {props.children}

        </TokenContext.Provider>
    )
}

export default TokenState