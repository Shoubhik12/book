const mongoose = require("mongoose")
require("dotenv").config()

const mongoURL = process.env.MONGODB

const intialiseDatabase = async ()=>{
    mongoose.connect(mongoURL).
    then(()=>console.log("Connected to the database.")).
    catch((error)=>console.log(error))
}

module.exports={intialiseDatabase}