const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.MONGODB

const intialiseDatabase = async ()=>{
    mongoose.connect(mongoURL).
    then(()=>console.log("Connected to the database.")).
    catch((error)=>console.log("Error connecting to the database."))
}

module.exports={intialiseDatabase}