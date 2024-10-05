import React from "react"
import Notes from "./Notes"
// import NoteContext from "../Context/notes/NoteContext"


const Home = (props) => {
    const {showAlert} = props;
    return (
        <div className='container my-3 col-md-10 offset-md-1'>
            <Notes showAlert={showAlert}/>
        </div>
    )
}

export default Home;