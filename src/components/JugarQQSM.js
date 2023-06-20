import { useState } from 'react';
import Resumen from './Resumen';
import { Howl } from 'howler';
import fallo from '../data/fallo.mp3';
import acierto from '../data/acierto.mp3';
import jugar from '../data/quien-quiere-ser-millonario.mp3';
import suspense from '../data/suspense.mp3';


function JugarQQSM({preguntas}) {

    console.log(preguntas.preguntas) ;
    const[preguntasResumen, setPreguntasResumen] = useState(preguntas.preguntas);

    const sonidoFallo = new Howl({
        src: [fallo]
      });

    const sonidoSuspense = new Howl({
        src: [suspense]
      });

    const sonidoAcierto = new Howl({
        src: [acierto]
      });

      const sonidoJugar = new Howl({
        src: [jugar]
      });

    const[index, setIndex] = useState(0);
    const[controllerSiguientePregunta, setControllerSiguientePregunta] = useState(false);
    const[preguntaMarcada, setPreguntaMarcada] = useState(-1);
    const[handlePreguntaMarcada, setHandlePreguntaMarcada] = useState(true);
    const[preguntaCorrecta, setPreguntaCorrecta] = useState(false);
    const[preguntaRespondida, setPreguntaRespondida] = useState(false);

    const[terminarJuego, setTerminarJuego] = useState(false);
    
    const[preguntaAcertada, setPreguntaAcertada] = useState([]);
    const[preguntaFallada, setPreguntaFallada] = useState([]);

    function handleSiguientePregunta(){
        let auxIndex = index + 1;
        setIndex(auxIndex);
        setPreguntaMarcada(-1); setPreguntaCorrecta(false); setPreguntaRespondida(false); setHandlePreguntaMarcada(true);

        if(index === (preguntas.preguntas.length-2)){
            setControllerSiguientePregunta(true);
        }
        sonidoAcierto.pause();
        sonidoFallo.pause();
        sonidoJugar.play();
        sonidoSuspense.play();
    }

    function comprobarPregunta(id){   

        setPreguntaRespondida(true);    
        let respuestaCorrecta = -1; 
        for(let i=0; i<preguntas.preguntas[index].respuestas.length; i++){
            if(preguntas.preguntas[index].respuestas[i].correcta === true)
                respuestaCorrecta = preguntas.preguntas[index].respuestas[i].numero;
        }       
        if(preguntaMarcada === respuestaCorrecta){
            sonidoAcierto.play();
            sonidoSuspense.pause();
            let preguntasAux = preguntasResumen;
            preguntasAux[index].resultado = true;
            setPreguntasResumen(preguntasAux);
            setPreguntaCorrecta(true);
            setPreguntaAcertada([...preguntaAcertada, id]);
            console.log(preguntaAcertada);
        }else{
            sonidoFallo.play();
            sonidoSuspense.pause();
            let preguntasAux = preguntasResumen;
            preguntasAux[index].resultado = false;
            setPreguntasResumen(preguntasAux);
            setPreguntaFallada([...preguntaFallada, id]);
            console.log(preguntaFallada);
        }
    }

    function checkPreguntaMarcada(numero){
        setPreguntaMarcada(numero);
        setHandlePreguntaMarcada(false);
    }

    function handleTerminarJuego(){
        setTerminarJuego(true);
    }

    return(
    <div className='flex flex-row w-full '>


        {
            terminarJuego === false
            ?
                <div className='  w-full flex flex-row align-middle justify-center items-center p-2'>
                    <div className=' w-3/4 flex flex-col align-middle justify-center items-center p-2'>
                    
                        <div className='bg-blue-400 w-3/4 border-2 rounded-md flex align-middle justify-center mb-2 p-2'>
                            <p className='text-white'> {preguntas.preguntas[index].texto}</p>
                        </div>

                        {preguntas.preguntas[index].respuestas.map((respuesta, indice) => (
                        (
                            respuesta.numero === preguntaMarcada
                            ?
                            (
                                preguntaRespondida === true
                                ?
                                    preguntaCorrecta === true
                                    ?
                                    <div className='w-1/3 bg-green-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                        <label className="w-full mt-1 m-1 ml-2 text-white" >
                                            <input className='appearance-none text-white' checked={false} type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div>
                                    :
                                    <div className='w-1/3 bg-red-600 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                        <label className="w-full mt-1 m-1 ml-2 text-white" >
                                            <input className='appearance-none text-white' checked={false} type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div>
                                :
                                <div className='w-1/3 bg-orange-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                    <label className="w-full mt-1 m-1 ml-2 text-white" >
                                        <input className='appearance-none text-white' type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                    </label>
                                </div>
                            )
                            :
                                indice === 0
                                ?
                                    <div className='w-1/3 bg-blue-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2 hover:bg-orange-300'>
                                        <label className="w-full p-1 text-black" > A)
                                            <input className='appearance-none text-white' type='radio' disabled={preguntaRespondida} name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div>
                                :
                                indice === 1
                                ?
                                    <div className='w-1/3 bg-blue-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2 hover:bg-orange-300'>
                                        <label className="w-full p-1 text-black" > B)
                                            <input className='appearance-none text-white' type='radio' disabled={preguntaRespondida} name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div>
                                :
                                indice === 2
                                ?
                                    <div className='w-1/3 bg-blue-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2 hover:bg-orange-300'>
                                        <label className="w-full p-1 text-black" > C)
                                            <input className='appearance-none text-white' type='radio' disabled={preguntaRespondida} name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div>  
                                :
                                    <div className='w-1/3 bg-blue-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2 hover:bg-orange-300'>
                                        <label className="w-full p-1 text-black" > D)
                                            <input className='appearance-none text-white' type='radio' disabled={preguntaRespondida} name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                        </label>
                                    </div> 

                        )

                        ))}

                        <div className='flex flex-row align-middle justify-center mt-4 w-3/4 '>

                            <button className="bg-purple-400 w-1/6 border-2 rounded-md p-2 mt-2 mb-2 mr-2" disabled={handlePreguntaMarcada} onClick={() => comprobarPregunta(preguntas.preguntas[index].id)}>Comprobar pregunta</button>

                            {
                                controllerSiguientePregunta === true
                                ?
                                    null
                                :
                                    <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mb-2 " disabled={!preguntaRespondida} onClick={() => handleSiguientePregunta()}>Siguiente pregunta</button>
                            }

                            {
                                controllerSiguientePregunta === true
                                ?
                                    <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mb-2 " disabled={!preguntaRespondida} onClick={() => handleTerminarJuego()}>Terminar el juego</button>
                                :
                                    null
                            }
                        </div>

                    </div>

                    <div className='w-1/4 mr-6 flex flex-col flex-grow border border-white justify-start  items-center bg-blue-300'>

                        <p className='text-white mt-2 text-center w-2/4'>RESUMEN</p>
                                            
                        <div className='flex flex-col justify-center items-center align-middle mt-2 mb-6 w-3/4 border border-white'>
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
                                            
                    </div>

                </div>
            :
                <Resumen preguntasResumen={preguntasResumen}></Resumen>
                
        }


        
    </div>

        
    )

}

export default JugarQQSM;
//
