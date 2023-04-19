import { useState } from 'react';
import Resultados from './Resultados';

function JugarQQSM({preguntas}) {

    console.log(preguntas.preguntas) ;
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

    }

    function comprobarPregunta(id){   
        setPreguntaRespondida(true);    
        let respuestaCorrecta = -1; 
        for(let i=0; i<preguntas.preguntas[index].respuestas.length; i++){
            if(preguntas.preguntas[index].respuestas[i].correcta === true)
                respuestaCorrecta = preguntas.preguntas[index].respuestas[i].numero;
        }       
        if(preguntaMarcada === respuestaCorrecta){
            setPreguntaCorrecta(true);
            setPreguntaAcertada([...preguntaAcertada, id]);
            console.log(preguntaAcertada);
        }else{
            setPreguntaFallada([...preguntaFallada, id]);
            console.log(preguntaFallada);
        }
    }

    function checkPreguntaMarcada(numero){
        setPreguntaMarcada(numero)
        setHandlePreguntaMarcada(false);
    }

    function handleTerminarJuego(){
        setTerminarJuego(true);
    }

    return(
        <>
        {
            terminarJuego === false
            ?
                <div className='flex flex-col align-middle justify-center items-center p-2'>
                    
                    <div className='bg-slate-500 w-3/4 border-2 rounded-md flex align-middle justify-center mb-2 p-2'>
                        <p> {preguntas.preguntas[index].texto}</p>
                    </div>

                    {preguntas.preguntas[index].respuestas.map((respuesta) => (
                    (
                        respuesta.numero === preguntaMarcada
                        ?
                        (
                            preguntaRespondida === true
                            ?
                                preguntaCorrecta === true
                                ?
                                <div className='w-1/3 bg-green-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                    <label className="w-full mt-1 m-1 ml-2" >
                                        <input className='appearance-none' checked={false} type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                    </label>
                                </div>
                                :
                                <div className='w-1/3 bg-red-600 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                    <label className="w-full mt-1 m-1 ml-2 " >
                                        <input className='appearance-none' checked={false} type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                    </label>
                                </div>
                            :
                            <div className='w-1/3 bg-orange-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                <label className="w-full mt-1 m-1 ml-2" >
                                    <input className='appearance-none' type='radio' name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                </label>
                            </div>
                        )
                        :
                            <div className='w-1/3 bg-slate-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
                                <label className="w-full mt-1 m-1 ml-2 " > a)
                                    <input className='appearance-none' type='radio' disabled={preguntaRespondida} name={preguntas.preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                </label>
                            </div>
                    )

                    ))}

                    <div className='flex flex-row align-middle justify-center mt-4 w-3/4 '>

                        <button className="bg-purple-400 w-1/6 border-2 rounded-md p-2 mt-2 mb-2 " disabled={handlePreguntaMarcada} onClick={() => comprobarPregunta(preguntas.preguntas[index].id)}>Comprobar pregunta</button>

                        {
                            controllerSiguientePregunta === true
                            ?
                                null
                            :
                                <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mb-2 " onClick={() => handleSiguientePregunta()}>Siguiente pregunta</button>
                        }

                        {
                            controllerSiguientePregunta === true
                            ?
                                <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mb-2 " onClick={() => handleTerminarJuego()}>Terminar el juego</button>
                            :
                                null
                        }
                    </div>

                </div>
            :
                <Resultados preguntasCorrectas={preguntaAcertada} preguntasFalladas={preguntaFallada} ></Resultados>
        }
        </>
    
        
    )

}

export default JugarQQSM;
//
