import { useState } from 'react';

function JugarQQSM({preguntas}) {

    console.log(preguntas)  
    const[index, setIndex] = useState(0);
    const[controllerSiguientePregunta, setControllerSiguientePregunta] = useState(false);
    const[preguntaMarcada, setPreguntaMarcada] = useState(-1);
    const[preguntaCorrecta, setPreguntaCorrecta] = useState(false);
    const[preguntaRespondida, setPreguntaRespondida] = useState(false); 

    function handleSiguientePregunta(){
        let auxIndex = index + 1;
        setIndex(auxIndex);
        setPreguntaMarcada(-1); setPreguntaCorrecta(false); setPreguntaRespondida(false);

        if(index < preguntas.length){
            setControllerSiguientePregunta(true);
        }

    }

    function comprobarPregunta(){   
        setPreguntaRespondida(true);    
        let respuestaCorrecta = -1; 
        for(let i=0; i<preguntas[index].respuestas.length; i++){
            if(preguntas[index].respuestas[i].correcta === true)
                respuestaCorrecta = preguntas[index].respuestas[i].numero;
        }       
        if(preguntaMarcada === respuestaCorrecta){
            setPreguntaCorrecta(true);
        }   
    }



    return(
    <div>
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
                        <input className='appearance-none' type='radio' name={preguntas[index].id} onChange={() => setPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                    </label>
                    :
                    <label className="px-3 py-1 rounded-lg font-bold text-black bg-red-600" >
                        <input className='appearance-none' type='radio' name={preguntas[index].id} onChange={() => setPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                    </label>
                :
                <label className="px-3 py-1 rounded-lg font-bold text-black bg-orange-400" >
                    <input className='appearance-none' type='radio' name={preguntas[index].id} onChange={() => setPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                </label>
            )
            :
                <label className="px-3 py-1 rounded-lg font-bold text-black bg-slate-400" >
                    <input className='appearance-none' type='radio' disabled={preguntaRespondida} name={preguntas[index].id} onChange={() => setPreguntaMarcada(respuesta.numero)} value={respuesta.texto} /> {respuesta.texto}
                </label>
        )

        ))}

        <button className="mr-2 border p-1 " onClick={() => comprobarPregunta()}>Comprobar pregunta</button>

        {
            controllerSiguientePregunta === true
            ?
                <button className="mr-2 border p-1 " onClick={() => window.location.reload()}>Terminar el juego</button>
            :
                <button className="mr-2 border p-1 " onClick={() => handleSiguientePregunta()}>Siguiente pregunta</button>
        }
        
    </div>
        
    )

}

export default JugarQQSM;