import { useState } from 'react';
import JugarQQSM from "../components/JugarQQSM";
import preguntas from '../data/preguntas.json'

function AnadirPregunta() {

  const [dataPreguntas, setDataPreguntas] = useState(preguntas.preguntas);
  const [pestanha, setPestanha] = useState(0);
  let ids = 3;

  const[textoPregunta, setTextoPregunta] = useState("");
  const[opcion1, setOpcion1] = useState("");
  const[opcion2, setOpcion2] = useState("");
  const[opcion3, setOpcion3] = useState("");
  const[opcion4, setOpcion4] = useState("");


  function crearPregunta(){
    const nuevaPregunta = {
      id: ids,
      texto: textoPregunta,
      respuestas: [
        {"texto": opcion1, "correcta": true, numero: 1},
        {"texto": opcion2, "correcta": false, numero: 2},
        {"texto": opcion3, "correcta": false, numero: 3},
        {"texto": opcion4, "correcta": false, numero: 4}
      ]
    };
    setDataPreguntas([...dataPreguntas, nuevaPregunta]);
    ids += 1;
  }
  

  return (
    <div className="w-screen h-screen bg-cover bg-no-repeat"
    style={{ backgroundImage: "url('https://s1.ppllstatics.com/lasprovincias/www/multimedia/201912/07/media/cortadas/carlos-sobera-kHSD-U90899736077zr-1248x770@Las%20Provincias.jpg')" }}>

      {
        pestanha === 0
        ?
        <div className='flex flex-col'>
          <label htmlFor="Titulo">Nombre:</label> <input id="Titulo" onChange={(e) => setTextoPregunta(e.target.value)}></input>
          <label htmlFor="opcion1">a)</label><input id="opcion1" onChange={(e) => setOpcion1(e.target.value)}></input>
          <label htmlFor="opcion2">b)</label><input id="opcion2" onChange={(e) => setOpcion2(e.target.value)}></input>
          <label htmlFor="opcion3">c)</label><input id="opcion3" onChange={(e) => setOpcion3(e.target.value)}></input>
          <label htmlFor="opcion4">d)</label><input id="opcion4" onChange={(e) => setOpcion4(e.target.value)}></input>
          <button onClick={() => crearPregunta()}>añadir pregunta</button>
          <button onClick={() => setPestanha(1)}>Jugar</button>
        </div>
        :
        <div>
          <JugarQQSM preguntas={dataPreguntas}></JugarQQSM>
        </div>
      }

    </div>
  );
}

export default AnadirPregunta;
