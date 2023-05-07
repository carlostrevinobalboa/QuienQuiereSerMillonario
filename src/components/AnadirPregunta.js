import { useState, useEffect } from 'react';
import JugarQQSM from "../components/JugarQQSM";
import swal from 'sweetalert2'

function AnadirPregunta() {

  const [controllerNumeroPreguntas, setControllerNumeroPreguntas] = useState(false);

  let myData = {};

  //controladores de que se ha introducido todo correctamente, si valen true, ha habido un error
  let controller = false;
  let controllerDatosPreguntas = false;
  let controllerOpcionesMarcadas = false;

  const storedData = localStorage.getItem('myData');
  if (storedData) {
    //hay preguntas prealmacenadas
    myData = JSON.parse(storedData);
    controller = false;
  }else{
    controller = true;
  }

  useEffect(() => {
    
    if(myData && myData.preguntas){
      if(myData.preguntas.length === 15){
        setControllerNumeroPreguntas(true);
      }
    }

    
  }, [myData]);


  const [pestanha, setPestanha] = useState(0);

  const[textoPregunta, setTextoPregunta] = useState("");
  const[opcion1, setOpcion1] = useState("");
  const[opcion2, setOpcion2] = useState("");
  const[opcion3, setOpcion3] = useState("");
  const[opcion4, setOpcion4] = useState("");

  const[correcta1, setCorrecta1] = useState(false);
  const[correcta2, setCorrecta2] = useState(false);
  const[correcta3, setCorrecta3] = useState(false);
  const[correcta4, setCorrecta4] = useState(false);

  function auxComprobaciones(){

    if(textoPregunta === "")
      controllerDatosPreguntas = true;
    if(opcion1 === "")
      controllerDatosPreguntas = true;
    if(opcion2 === "")
      controllerDatosPreguntas = true;
    if(opcion3 === "")
      controllerDatosPreguntas = true;
    if(opcion4 === "")
      controllerDatosPreguntas = true;

    let contador = 0;
    if(correcta1 === false)
      contador += 1
    if(correcta2 === false)
      contador += 1
    if(correcta3 === false)
      contador += 1
    if(correcta4 === false)
      contador += 1

    if(contador === 4)
      controllerOpcionesMarcadas = true;
  }

  function crearPregunta(){

    auxComprobaciones();

    if(controllerDatosPreguntas === false && controllerOpcionesMarcadas === false){

      const nuevaPregunta = {
        texto: textoPregunta,
        respuestas: [
          {"texto": opcion1, "correcta": correcta1, numero: 1},
          {"texto": opcion2, "correcta": correcta2, numero: 2},
          {"texto": opcion3, "correcta": correcta3, numero: 3},
          {"texto": opcion4, "correcta": correcta4, numero: 4}
        ],
        resultado: null,
      };
      if (!myData.preguntas) {
        myData.preguntas = [];
      }
      myData.preguntas.push(nuevaPregunta);
      
  
      const jsonData = JSON.stringify(myData);
      localStorage.setItem('myData', jsonData);
      
      setOpcion1("");
      setOpcion2("");
      setOpcion3("");
      setOpcion4("");
      setCorrecta1(false);
      setCorrecta2(false);
      setCorrecta3(false);
      setCorrecta4(false);
      setTextoPregunta("");



    }else if(controllerDatosPreguntas === true){
      swal.fire("Error, completa todos los datos de las preguntas", "", "warning");
    }else if(controllerOpcionesMarcadas === true){
      swal.fire("Error, marca la opción correcta", "", "warning");
    }



  }

  function handleEliminarPregunta(){
    localStorage.clear();

    const storedData2 = localStorage.getItem('myData');
    if (storedData2) {
      myData = JSON.parse(storedData2);
      controller = false;
    }else{
      controller = true;
    }
  }

  function handleJugar(){
    if(Object.keys(myData).length === 0){
      controller = true;
    }

    if(controller === false && controllerDatosPreguntas === false && controllerOpcionesMarcadas === false && myData.preguntas.length === 15){
      setPestanha(1);
    }else{
      swal.fire("Debes añadir 15 preguntas para poder jugar","","info");
    }

  }
  
  return (
    <div className="w-screen h-screen bg-cover bg-no-repeat flex flex-col align-middle justify-center"
    style={{ backgroundImage: "url('https://s1.ppllstatics.com/lasprovincias/www/multimedia/201912/07/media/cortadas/carlos-sobera-kHSD-U90899736077zr-1248x770@Las%20Provincias.jpg')" }}>

      {
        pestanha === 0
        ?
        <div className='flex flex-col  align-middle justify-center items-center p-2'>
          {
            myData.preguntas && 
            <p className='bg-black text-white'>Número de preguntas: {myData.preguntas.length}</p>
          }
          

          <div className='bg-slate-500 w-3/4 border-2 rounded-md flex flex-row align-middle justify-center mb-2 p-2'>
            <label className='mt-1' htmlFor="Titulo" >Titulo:</label>
              <input className="w-2/4 mt-1 m-1 ml-2 border rounded-md"  id="Titulo" onChange={(e) => setTextoPregunta(e.target.value)} value={textoPregunta} ></input>
          </div>

          <div className='w-3/4   flex flex-row align-middle justify-center space-x-20 mb-2 '>

            <div className='w-1/3 bg-emerald-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
              <label className='mt-1' htmlFor="opcion1">a)</label>
                <input className="w-full mt-1 m-1 ml-2 border rounded-md" id="opcion1" onChange={(e) => setOpcion1(e.target.value)} value={opcion1}></input>
                <input type='radio' name='opcionCorrecta' onClick={() => setCorrecta1(true)}></input>
            </div>

            <div className='w-1/3 bg-emerald-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
              <label className='mt-1' htmlFor="opcion2">b)</label>
                <input className=" w-full mt-1 m-1 ml-2 border rounded-md " id="opcion2" onChange={(e) => setOpcion2(e.target.value)} value={opcion2}></input>
                <input type='radio' name='opcionCorrecta' onClick={() => setCorrecta2(true)}></input>
            </div>
          </div>

          <div className='w-3/4  flex flex-row align-middle justify-center space-x-20 mb-2 '>

            <div className='w-1/3 bg-emerald-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
              <label className='' htmlFor="opcion3">c)</label>
                <input className="w-full mt-1 m-1 ml-2 border rounded-md" id="opcion3" onChange={(e) => setOpcion3(e.target.value)} value={opcion3}></input>
                <input type='radio' name='opcionCorrecta' onClick={() => setCorrecta3(true)}></input>
            </div>

            <div className='w-1/3 bg-emerald-400 rounded-3xl border-2 border-white flex flex-row align-middle justify-center items-center p-2'>
              <label className='mt-1' htmlFor="opcion4">d)</label>
                <input className=" w-full mt-1 m-1 ml-2 border rounded-md " id="opcion4" onChange={(e) => setOpcion4(e.target.value)} value={opcion4}></input>
                <input type='radio' name='opcionCorrecta' onClick={() => setCorrecta4(true)}></input>
            </div>
          </div>

          <button className='bg-purple-400 w-1/6 border-2 rounded-md p-2 mt-2 mb-2' disabled={controllerNumeroPreguntas} onClick={() => crearPregunta()}>añadir pregunta</button>
          <button className='bg-purple-400 w-1/6 border-2 rounded-md p-2 mt-2 mb-2' onClick={() => handleJugar()}>Jugar</button>
          <button className='bg-purple-400 w-1/6 border-2 rounded-md p-2 mt-2 mb-2' onClick={() => handleEliminarPregunta()}>Eliminar preguntas</button>

        </div>

        :
          <JugarQQSM preguntas={myData}></JugarQQSM>
      }

    </div>
  );
}

export default AnadirPregunta;
