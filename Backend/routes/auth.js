const express = require ('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

//created a rando secret string
const JWT_SECRET = "tumrisabkimakichutmaitovohkarungajomeremanmeayega";


// ROUTE 1: Create a user using: POST "/api/auth/createuser". no login require 
router.post("/createuser", [
    body('name','Name must be atleast of 3 characters').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be 5 characters').isLength({min: 5}), 
],async (req, res)=>{ 

    //if there are errors exist, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    
    try{
    //check wheather the user with this email exist already
    let user = await User.findOne({email: req.body.email});
    if (user){
        return res.status(400).json({error: "Sorry the user with this email already exist" })
    }
    //creating salt for bycrypt
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    
    //creating a user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    // res.json({err: "please enter a unique value"})})

    const data = {
        user: {
            id : user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET)
    res.json({authToken});
    }
    //catching the errors there after 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error occured");
    } 

    // console.log(req.body);
    // const user = User(req.body);
    // user.save();
    // res.send(req.body);



    // obj={
    //     a: 'rank',
    //     number: 4500, 

    // }
    // res.json(obj);
})   


// ROUTE 2: Create a user using: POST "/api/auth/login". no login require 
router.post("/login", [ 
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(), 
],async (req, res)=>{
    //if there are errors exist, return bad request and errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ error: result.array() });
    } 

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({success, error: "Please enter the correct login credentials"})
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword){
            success= false;
            return res.status(400).json({success, error: "Please enter the correct login credentials"})
        }

        const data = {
            user: {
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});


    }catch(error){
        return res.status(500).send("Internal server error occured");
    }
})



// ROUTE 3: Get logined user details using: POST "/api/auth/Getuser". no login require 
router.post("/Getuser", fetchuser, async (req, res)=>{
    try {
        userID = req.user.id; 
        const user = await User.findById(userID).select("email name");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal server error occured");
    }
})



module.exports = router  