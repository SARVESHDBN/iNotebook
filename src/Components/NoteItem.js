import React, { useContext } from 'react'
import notecontext from "../Context/notes/NoteContext"


const NoteItem = (props) => {
    const context = useContext(notecontext);
    const {deletenote} = context;
    const {note, updateNote} = props;

    return (
        <div className='col-md-3 '>
            <div className="card my-3" style={{width: "15rem"}}>
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <h6 className="card-text">{note.description}</h6>
                <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam mollitia magnam sint consequatur? Odit voluptatem enim quod in ad. Dolorem nobis quae consequatur quibusdam voluptatum quis cumque, ratione illum? Iure.
                </p>
                <i className="fa-regular fa-trash-can mx-2" onClick = {()=>{deletenote(note._id);props.showAlert("Deleted Successfuly", "success")}}></i>
                <i className="fa-regular fa-pen-to-square mx-2" onClick = {()=>{updateNote(note); }}></i>
            </div>
            </div>  
        </div> 
    )
}

export default NoteItem;
