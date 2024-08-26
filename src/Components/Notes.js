import React, { useContext, useEffect, useRef, useState} from 'react'
import NoteItem from "./NoteItem"
import notecontext from "../Context/notes/NoteContext"
import AddNote from "./addnote"

const Notes = () => {
    const context = useContext(notecontext);
    const {notes, getNote, editnote} = context;
    const [note, setNote]= useState({eid: "", etitle: "", edescription:"", etags:""});

    useEffect(()=>{
        getNote()
    }, [])

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) =>{
        ref.current.click();
        setNote({eid:currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etags: currentNote.tags})
    }
    
    const handleClick = (e)=>{
        console.log("Updating the note...", note);
        editnote(note.eid, note.etitle, note.edescription, note.etags);
        refClose.current.click();
        e.preventDefault();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    } 

    return(
        <>
        <AddNote/> 
        <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
            Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span className = "align-right" aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className='my-3'>
                            <div className="mb-3 form-group">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"
                                onChange={onChange} value={note.etitle} minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tags" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etags" name="etags" onChange={onChange} value={note.etags} minLength={5} required/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}> Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3'>
            <h2>Your Notes</h2>
            <div className="container mx-2">
                {notes.length === 0 && 'No notes to display'}
            </div>
            {notes.map((note) => {
                return <NoteItem key={note._id} updateNote={updateNote} note={note}/>  
            })}
        </div>
        </>
    )
}

export default Notes;
