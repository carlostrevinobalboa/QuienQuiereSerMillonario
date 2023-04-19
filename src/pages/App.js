import { useState } from "react";
import AnadirPregunta from "../components/AnadirPregunta";


function App() {

  const [pestanha, setPestanha] = useState(0);

  return(
    <div className="w-screen h-screen bg-cover bg-no-repeat "
    style={{ backgroundImage: "url('https://s1.ppllstatics.com/lasprovincias/www/multimedia/201912/07/media/cortadas/carlos-sobera-kHSD-U90899736077zr-1248x770@Las%20Provincias.jpg')" }}>
      {
        pestanha === 0
        ?

          <button onClick={() => setPestanha(1)} className="border">Crear Preguntas</button>

        :
        <AnadirPregunta></AnadirPregunta>
      }

    </div>
  ) 

}

export default App;
