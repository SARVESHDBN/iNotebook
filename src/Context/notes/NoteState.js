import React, { useState } from 'react';
import NoteContext from './NoteContext';


const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const notesInitial = [];

//     const s1 = {
//         "name": "Sarvesh",
//         "batch": "A6"
//     } 

//     const [state, setState] = useState(s1)
//     const update = () =>{
//         setTimeout( ()=>{
//             setState({
//                 "name": "Meena",
//                 "batch":"A7"
//             })
//         }, 1000)
//     }

    const [notes, setNotes] = useState(notesInitial);

    //Get all note 
    const getNote = async () =>{
        //handle object logic --> not usefull in our case but might be usefull in some other scenario (just view)
        // try{
        //     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "auth-token": localStorage.getItem("token")
        //         },
        //     });
        //     const json = await response.json(); 
        //     console.log(json);
            
        //     if (Array.isArray(json)) {
        //         setNotes(json); // Ensure that you're setting an array of notes
        //     } 
        //     else {
        //         setNotes([]); // Fallback if it's not an array
        //     }    
        // }
        // catch (error) {
        //     console.error("Error fetching notes:", error);
        // }



        //TODO : API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token")
            },
        });
        const json = await response.json(); 
        console.log(json);
        setNotes(json);
    }

    //Add a note 
    const addNote = async (title, description, tags) =>{

        //TODO : API call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tags}),
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }



    //Delete a note
    const deletenote = async (id) =>{
        //TODO : API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
        });
        const json = response.json();
        console.log(json);

        //deleting logic
        console.log("the note is deleted with the respective id:"+ id);
        const newNote = notes.filter((note)=>{return  note._id !== id})
        setNotes(newNote);
    }



    //Edit a note
    const editnote = async (id, title, description, tags) =>{

        //TODO : API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tags}),
        });
        const json = await response.json(); 
        let newNotes = JSON.parse(JSON.stringify(notes));
        console.log(json);

        //logic to edit in client
        for(let i = 0; i< notes.length; i++){
            const element = notes[i];
            if (element._id === id){
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tags = tags;
                break;
            } 
        }
        setNotes(newNotes);
    }



    return( 
        <NoteContext.Provider value = {{notes, getNote, addNote, deletenote, editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;