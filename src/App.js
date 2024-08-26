import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert';
import Login from './Components/login';
import SignUp from './Components/signup';


function App() {
  return (
    <>
    <NoteState>
      <Router> 
        <Navbar />
        <Alert message = "This is amazing react cource"/>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div> 
      </Router> 
    </NoteState>
    </>
  );
}

export default App;
