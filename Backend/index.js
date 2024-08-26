const connectToMongo = require("./db");
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express()
const port = 5000


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// app.get('/', (req, res) => {
//     res.send('Hello Sarvesh!') 
// })

app.get('/api/notes/fetchallnotes', (req, res) => {
    res.json({ message: 'This is a test response' });
});

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello Signup!')
// })

app.listen(port, () => {
    console.log(`iNoteboook backend listening on port ${port}`)
})
