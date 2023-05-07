import { useState } from "react";


function Resumen({preguntasResumen}) {


  return(
    <div className=' flex flex-col flex-grow border border-white justify-start  items-center bg-blue-300'>

        <p className='text-white mt-2 text-center w-2/4'>RESUMEN</p>
                    
        <div className='flex flex-col justify-center items-center align-middle mt-2 mb-6 w-2/5 border border-white'>
            <p className={`w-full text-center border  ${preguntasResumen[14].resultado !== null ? preguntasResumen[14].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >15 - 1.000.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[13].resultado !== null ? preguntasResumen[13].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >14 - 500.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[12].resultado !== null ? preguntasResumen[12].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >13 - 250.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[11].resultado !== null ? preguntasResumen[11].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >12 - 125.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[10].resultado !== null ? preguntasResumen[10].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >11 - 64.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[9].resultado !== null ? preguntasResumen[9].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >10 - 32.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[8].resultado !== null ? preguntasResumen[8].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >9 - 16.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[7].resultado !== null ? preguntasResumen[7].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >8 - 8.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[6].resultado !== null ? preguntasResumen[6].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >7 - 4.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[5].resultado !== null ? preguntasResumen[5].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >6 - 2.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[4].resultado !== null ? preguntasResumen[4].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >5 - 1.000€</p>
            <p className={`w-full text-center border  ${preguntasResumen[3].resultado !== null ? preguntasResumen[3].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >4 - 500€</p>
            <p className={`w-full text-center border  ${preguntasResumen[2].resultado !== null ? preguntasResumen[2].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >3 - 300€</p>
            <p className={`w-full text-center border  ${preguntasResumen[1].resultado !== null ? preguntasResumen[1].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >2 - 200€</p>
            <p className={`w-full text-center border  ${preguntasResumen[0].resultado !== null ? preguntasResumen[0].resultado ? 'bg-green-500' : 'bg-red-500' : 'bg-gray-500'}`} >1 - 100€</p>
        </div>

        <button className="bg-purple-400 w-auto border-2 rounded-md p-2 " onClick={()=>window.location.reload()}>Reiniciar</button>
                    
    </div>
  ) 

}

export default Resumen;
