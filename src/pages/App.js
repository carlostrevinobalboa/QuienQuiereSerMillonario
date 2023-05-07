import { useState } from "react";
import AnadirPregunta from "../components/AnadirPregunta";
import preguntas from "../data/preguntasDemo.json"
import JugarQQSM from "../components/JugarQQSM";


function App() {

  const [pestanha, setPestanha] = useState(0);

  return(
    <div className="w-screen h-screen bg-cover bg-no-repeat flex align-middle justify-center items-center"
    style={{ backgroundImage: "url('https://s1.ppllstatics.com/lasprovincias/www/multimedia/201912/07/media/cortadas/carlos-sobera-kHSD-U90899736077zr-1248x770@Las%20Provincias.jpg')" }}>
      
      {pestanha === 0 && (
        <div>
          <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 mr-2 " onClick={()=>setPestanha(1)}>Crear preguntas</button>
          <button className="bg-purple-400 w-auto border-2 rounded-md p-2 mt-2 " onClick={()=>setPestanha(2)}>Jugar Demo</button>
        </div>
      )}
      {pestanha === 1 && <AnadirPregunta />}
      {pestanha === 2 && <JugarQQSM preguntas={preguntas}></JugarQQSM>}


    </div>
  ) 

}

export default App;
