import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';
import Inicio from './views/dashboard/index';
import Routes from './routes';

function App() {

  const [nome, setNomeProduto] = useState('')
  const [descricao, setDescricaoProduto] = useState('')
  const [preco, setPrecoProduto] = useState('')
  const [quantidade, setQuantidadeProduto] = useState('')

  const submit = () => {
    Axios.post("http://localhost:3001/produtos", { nome, descricao, preco, quantidade }).then(() => {
      alert('Sucesso');
    })
  };

  return (
    <div className="App">
      <Routes />
    </div>
    /*
    <div className="App">
      <h1>CRUD</h1>
      <div className="form">
        <label>Nome</label>
        <input type="text" name="nome" onChange={(e) => {
          setNomeProduto(e.target.value)
        }}></input>

        <label>descricao</label>
        <input type="text" name="descricao" onChange={(e) => {
          setDescricaoProduto(e.target.value)
        }}></input>

        <label>preco</label>
        <input type="text" name="preco" onChange={(e) => {
          setPrecoProduto(e.target.value)
        }}></input>

        <label>quantidade</label>
        <input type="text" name="quantidade" onChange={(e) => {
          setQuantidadeProduto(e.target.value)
        }}></input>

        <button type="submit" onClick={submit}>Confirmar</button>
      </div>
    </div>
    */
  );
  
}

export default App;
