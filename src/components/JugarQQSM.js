import { useState } from 'react';
import Resultados from './Resultados';

function JugarQQSM({preguntas}) {

    console.log(preguntas) ;
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

        if(index === (preguntas.length-2)){
            setControllerSiguientePregunta(true);
        }

    }

    function comprobarPregunta(id){   
        setPreguntaRespondida(true);    
        let respuestaCorrecta = -1; 
        for(let i=0; i<preguntas[index].respuestas.length; i++){
            if(preguntas[index].respuestas[i].correcta === true)
                respuestaCorrecta = preguntas[index].respuestas[i].numero;
        }       
        if(preguntaMarcada === respuestaCorrecta){
            setPreguntaCorrecta(true);
            setPreguntaAcertada([...preguntaAcertada, id]);
            console.log("-------");
            console.log(preguntaAcertada);
        }else{
            setPreguntaFallada([...preguntaFallada, id]);
            console.log("++++++");
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
                <div className='w-screen h-screen bg-cover bg-no-repeat'>
                    {console.log(preguntas)}
                    <p> {preguntas[index].texto}</p>
                    {preguntas[index].respuestas.map((respuesta) => (
                    (
                        respuesta.numero === preguntaMarcada
                        ?
                        (
                            preguntaRespondida === true
                            ?
                                preguntaCorrecta === true
                                ?
                                <label className="px-3 py-1 rounded-lg font-bold text-black bg-green-400" >
                                    <input className='appearance-none' checked={false} type='radio' name={preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                </label>
                                :
                                <label className="px-3 py-1 rounded-lg font-bold text-black bg-red-600" >
                                    <input className='appearance-none' checked={false} type='radio' name={preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                                </label>
                            :
                            <label className="px-3 py-1 rounded-lg font-bold text-black bg-orange-400" >
                                <input className='appearance-none' type='radio' name={preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                            </label>
                        )
                        :
                            <label className="px-3 py-1 rounded-lg font-bold text-black bg-slate-400" >
                                <input className='appearance-none' type='radio' disabled={preguntaRespondida} name={preguntas[index].id} onChange={() => checkPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                            </label>
                    )

                    ))}

                    <button className="mr-2 border p-1 " disabled={handlePreguntaMarcada} onClick={() => comprobarPregunta(preguntas[index].id)}>Comprobar pregunta</button>

                    {
                        controllerSiguientePregunta === true
                        ?
                            null
                        :
                            <button className="mr-2 border p-1 " onClick={() => handleSiguientePregunta()}>Siguiente pregunta</button>
                    }

                    {
                        controllerSiguientePregunta === true
                        ?
                            <button className="mr-2 border p-1 " onClick={() => handleTerminarJuego()}>Terminar el juego2</button>
                        :
                            null
                    }

                </div>
            :
                <Resultados preguntasCorrectas={preguntaAcertada} preguntasFalladas={preguntaFallada} ></Resultados>
        }
        </>
    
        
    )

}

export default JugarQQSM;
