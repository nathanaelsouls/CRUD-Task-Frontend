import './App.css';
import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import SimpleCard from './components/cards/card.js'

function App() {   
  const [values, setValues] = useState();
  const [listTask, setListTask] = useState();  

  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.id]: value.target.value,
    }))
  }

  
  const handleClickButton = async () => {
    await Axios.post("http://localhost:8800/", {
      titulo: values.titulo,
      descricao: values.descricao
    })
    .then(({data}) => console.log(data), alert("Tarefa Criada com sucesso!"), document.location.reload())    
    .catch(({data}) => console.log(data));    
  }

  useEffect(() => {
    Axios.get("http://localhost:8800/").then((response) => {
      setListTask(response.data);
    })
  }, []);

  return (
    <div className="App-container">      
      <form className="container">
        <h1 className="title">Tarefa</h1>
        <TextField id="titulo" placeholder="Nome" variant="outlined" class="campoTexto" onChange={handleChangeValues}></TextField>
        <TextField id="descricao" placeholder="Descrição" variant="outlined" class="campoTexto" onChange={handleChangeValues}></TextField>        
        <Button variant="contained" color="primary" onClick={() => handleClickButton()}>
          Criar nova Tarefa
        </Button>
      </form>
      <p className="titulo">Lista de Tarefas</p>
      <div>        
        { typeof listTask !== "undefined" && listTask.map((value) => {
          return (
          <SimpleCard 
            key={value.id} 
            listTask={listTask} 
            setListTask={setListTask}
            id={value.id}
            titulo={value.titulo}
            descricao={value.descricao}
          ></SimpleCard>
            );
        })}
      </div>
      
    </div>
  );
}

export default App;