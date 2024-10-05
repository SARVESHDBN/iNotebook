import React, {useContext, useState}from 'react'
import notecontext from "../Context/notes/NoteContext"


const AddNote = (props) => {
    const context = useContext(notecontext);
    const {addNote} = context;
    
    const [note, setNote]= useState({title: "", description:"", tags:""});
    
    const handleClick = (e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tags);
        setNote({title: "", description: "", tags: ""});
        props.showAlert("Adeded Successfuly", "success")
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title}
                    onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description}onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tags" name="tags" value={note.tags} onChange={onChange}
                    minLength={5} required/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} onChange={onChange}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote; 
