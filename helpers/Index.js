export const formatearCantidad = cantidad =>{

    return Number(cantidad).toLocaleString('en-Us',{
    
        style:'currency',
        currency:'COP'
    }
    
    
    
    
    )
    
    }


    export const formatearCantidad2 = cantidad =>{

        return Number(cantidad).toLocaleString('en-Us',{
        
            style:'currency',
            currency:'SOL'
        }
        
        
        
        
        )
        
        }