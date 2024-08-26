const express = require ('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// ROUTE 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login required  
router.get("/fetchallnotes", fetchuser, async (req, res)=>{
    try{
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }

    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    } 
})



// ROUTE 2: Get all the Notes using: POST "/api/notes/addnote". Login required  
router.post("/addnote", fetchuser, [
    body('title','Enter a valid title').isLength({min: 3}),
    body('description','Descrpition must be 5 characters long').isLength({min: 5}),
], async (req, res)=>{
    try{

        const {title, description, tag} = req.body;

        //if there are errors exist, return bad request and errors
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        } 

        const note = new Note({
            title, description, tag, user: req.user.id
        })  

        const savednote = await note.save()
        res.json(savednote); 
    }

    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    } 
});


// ROUTE 3: Update the existing Notes using: PUT "/api/notes/updatenote". Login required  
router.put("/updatenote/:id", fetchuser, async (req, res)=>{
    const {title, description, tag}= req.body;
    // Create newNote object
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};
    
    //find the Note to be updated and update it 
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(400).send("Not Found");
    };
    
    //does the uses is changing his own note or others (authentication if the user id matches the request id then updation is allowed)
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    };
    
    //syntax to update the note 
    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
    
})


// ROUTE 4: Delete the existing Notes using: PUT "/api/notes/deletenote". Login required  
router.delete("/deletenote/:id", fetchuser, async (req, res)=>{
    const {title, description, tag}= req.body;

    //find the note to be deleted and delete it 
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(400).send("Not Found");
    };
    
    //allow deletion only if the user owns this note
    if (note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    };
    
    //syntax to update the note 
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"Success": "Note has been deleted", note: note});
    
})



module.exports = router 