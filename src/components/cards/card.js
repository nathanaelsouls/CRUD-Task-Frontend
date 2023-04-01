import React from "react"
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import './card.css'
import FormDialog from "../dialog/dialog";

export default function SimpleCard(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return (   
    <>
        <FormDialog 
        open={open} 
        setOpen={setOpen} 
        titulo={props.titulo} 
        descricao={props.descricao} 
        listTask={props.listTask}
        setListTask={props.setListTask}
        id={props.id}
        />
        <Card className="card-container" onClick={() => handleClickCard()}>
          <CardContent className="card-content">
            <Typography variant="h5" className="card-titulo">
              {props.titulo}
            </Typography>
            <Typography variant="body2" className="card-descricao">          
              <br />
              <strong>Descrição:</strong> {props.descricao}
            </Typography>
          </CardContent>
        </Card>
    </>
    );
}