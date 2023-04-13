import { useState } from "react";
import AnadirPregunta from "../components/AnadirPregunta";


function App() {

  const [pestanha, setPestanha] = useState(0);

  return(
    <div className="w-screen h-screen bg-gradient-to-b from-indigo-500 via-yellow-400 to-white flex flex-col">

      {
        pestanha === 0
        ?
        <div className="flex flex-row">
          <button onClick={() => setPestanha(1)} className="mr-2 border p-1 ">Crear Preguntas</button>
        </div>
        :
        <AnadirPregunta></AnadirPregunta>
      }

    </div>
  ) 
  
}

export default App;
