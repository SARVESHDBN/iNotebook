const mongoose = require("mongoose");

const mongooURI = "mongodb://localhost:27017/iNotebook";

const connectToMongo = ()=>{
    mongoose.connect(mongooURI,).
    then(()=>{console.log("connected successfully")}).
    catch(()=>{console.error(err);
    })
}

module.exports = connectToMongo;