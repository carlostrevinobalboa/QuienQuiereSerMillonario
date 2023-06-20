import { useEffect, useState } from "react";
import { Howl } from 'howler';
import jugar from '../data/quien-quiere-ser-millonario.mp3';
import entrada from '../data/entrada.mp3';
import AnadirPregunta from "../components/AnadirPregunta";
import preguntas from "../data/preguntasDemo.json"
import JugarQQSM from "../components/JugarQQSM";


function App() {

  useEffect(() => {
    sonidoEntrada.play();
  }, []);

  const [pestanha, setPestanha] = useState(0);
  const sonidoJugar = new Howl({
    src: [jugar]
  });


  const sonidoEntrada = new Howl({  
    src: [entrada]
  });

  const reproducirSonido = () => {
    sonidoEntrada.pause();
    sonidoJugar.play();
  };



  return(
    <div className="w-screen h-screen flex align-middle justify-center items-center bg-gradient-radial from-slate-300 to-purple-900">
      
      {pestanha === 0 && (
        <div>
          <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mr-2 " onClick={()=>setPestanha(1)}>Crear preguntas</button>
          <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 " onClick={()=>{setPestanha(2); reproducirSonido()}}>Jugar Demo</button>
        </div>
      )}
      {pestanha === 1 && <AnadirPregunta />}
      {pestanha === 2 && <JugarQQSM preguntas={preguntas}></JugarQQSM>}

    </div>
  ) 

}

export default App;
