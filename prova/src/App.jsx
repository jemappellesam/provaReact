import { useState } from 'react'
import './App.css'
import axios from 'axios'



function App() {
  const [primeiroConselho, setPrimeiroConselho]=useState(null)
  const [conselhoDog, setConselhoDog]=useState(null)
  const [conselhoCat, setConselhoCat]=useState(null)
  const [conselhoEstudos, setConselhoEstudos]=useState(null)
  const [conselhoAleatorio, setConselhoAleatorio]=useState(null)
  axios.get("https://api.adviceslip.com/advice").then(res=>{
    const ob = JSON.parse(res.request.response)
    if(primeiroConselho==null){
    setPrimeiroConselho(ob.slip.advice)
    }
  })


  function gerarDog(){
    axios.get("https://api.adviceslip.com/advice/search/dog").then(
      res => {
        const ob2 = JSON.parse(res.request.response)
       setConselhoDog(ob2.slips[0].advice)
      }
    )
  }

  function gerarGatos(){
    axios.get("https://api.adviceslip.com/advice/search/cat").then(
      res => {
       const ob3 = JSON.parse(res.request.response)
       if(ob3.message.type=="notice"){
        setConselhoCat("Não encontrado conselhos de gatos")
       }
       else{
        setConselhoDog(ob2.slips[0].advice)
       }
       
      }
    )
  }

  function gerarEstudos(){
    axios.get("https://api.adviceslip.com/advice/search/study").then(
      res => {
        const ob4 = JSON.parse(res.request.response)
        if(ob4.message.type=="notice"){
          setConselhoEstudos("Não encontrado conselhos de estudos")
         }
         else{
          setConselhoEstudos(ob2.slips[0].advice)
         }
      }
    )
  }

  function gerarnovoAleatorio(){
    axios.get("https://api.adviceslip.com/advice").then(res=>{
      const ob5 = JSON.parse(res.request.response)
      setConselhoAleatorio(ob5.slip.advice)
    })
  }
  return (
    <>
    <div className="container mt-4">
    <div className="mb-4">
     <p>{primeiroConselho}</p>
    </div>

      <button className="btn btn-dark" onClick={gerarDog}>Conselhos de doguinhos</button> 

  
      <button className="btn btn-dark" onClick={gerarGatos}>Conselhos de gatos</button> 
  
 
      <button className="btn btn-dark" onClick={gerarEstudos}>Conselhos de estudos</button> 


      <button className="btn btn-dark" onClick={gerarnovoAleatorio}>Conselhos aleatório</button> 

  </div>
  {
    conselhoDog &&(
      <div>
       {conselhoDog}
      </div>
    )
  }
   {
    conselhoCat &&(
      <div>
       {conselhoCat}
      </div>
    )
  }
  {
    conselhoEstudos &&(
      <div>
       {conselhoEstudos}
      </div>
    )
  }
  {
    conselhoAleatorio &&(
      <div>
       {conselhoAleatorio}
      </div>
    )
  }
  </>
  )
}

export default App
