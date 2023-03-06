export const formatearCantidad = cantidad =>{

    return Number(cantidad).toLocaleString('en-Us',{
    
        style:'currency',
        currency:'COP'
    }
    
    
    
    
    )
    
    }