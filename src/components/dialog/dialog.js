import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';

export default function FormDialog(props) {  
  const[editValues, setEditValues] = useState({
    id: props.id,
    titulo: props.titulo,
    descricao: props.descricao,
  });

  const handleEditTask = async () => {
   await Axios.put("http://localhost:8800/"+ editValues.id,{        
        titulo: editValues.titulo,
        descricao: editValues.descricao,
    }).then( handleClose(), document.location.reload(), alert("Tarefa Editada com sucesso!")) 
  };

  const handleDeleteTask = async () => {
    await Axios.delete("http://localhost:8800/"+ editValues.id)
    .then( handleClose(), document.location.reload(), alert("Tarefa Deletada com sucesso!"));
  }
  
  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = value => {
    setEditValues(prevValue =>({
        ...prevValue,
        [value.target.id]: value.target.value,
    }))
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="titulo"
            label="Titulo"
            defaultValue={props.titulo}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="Descrição"
            defaultValue={props.descricao}
            onChange={handleChangeValues}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTask} color="primary">
            Excluir
          </Button>
          <Button onClick={handleEditTask} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
