import {FiSearch} from 'react-icons/fi'
import {useState} from 'react'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {

    if(input === ''){
      alert('Preencha com o CEP')
      return;
    }

    try{
      const response = await api.get(`${input}/json`)
      console.log(response.data)
      setCep(response.data)
      setInput('')
    } catch{
      alert('CEP não existente, tente novamente')
      setInput('')
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      
      <div className="container-input">
        <input
          type="text" placeholder="Buscar cep..." value={input} 
          onChange={ (e) => setInput(e.target.value) } />

        <button onClick={() => handleSearch()} className="button-search"><FiSearch size={25} color="#fff"/></button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span><strong>Rua:</strong> {cep.logradouro}</span>
        <span><strong>Complemento: </strong> {cep.complemento}</span>
        <span><strong>Bairro: </strong> {cep.bairro}</span>
        <span><strong>Cidade: </strong> {cep.localidade} - {cep.uf}</span>
      </main>
      )}

      
    </div>
  );
}

export default App;
