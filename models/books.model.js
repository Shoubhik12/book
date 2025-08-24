const mongoose = require("mongoose")

const booksSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publishedYear:{
        type:Number,
        required:true
    },
    genre:[
        {
            type:String
        }
    ],
    language:{
        type:String
    },
    country:{
        type:String
    },
    rating:{
        type:Number,
        min:0,
        max:10,
        default:10
    },
    summary:String,
    coverImageURL:String
},{
    timestamps:true,
})

const Book = mongoose.model("Book",booksSchema)

module.exports= Book