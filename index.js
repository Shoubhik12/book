const {intialiseDatabase} = require("./db/db.connect")
const Book = require("./models/books.model")
const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

intialiseDatabase()

async function createBook(newBook) {
    try {
        const book = new Book(newBook)
        const savedBook = await book.save()
        console.log(savedBook)
        return savedBook        
    } catch (error) {
        throw error
    }
}

app.post("/books",async (req,res)=>{
    try {
        const savedBook = await createBook(req.body)
        res.status(201).json({message:"Book saved successfully.",book:savedBook})
    } catch (error) {
        res.status(500).json({error:"Failed to add the book"})
    }
})

async function readAllBooks() {
    try {
        const book = await Book.find()
        return book
    } catch (error) {
        throw error
    }
}

app.get("/books",async (req,res) => {
    try {
        const books = await readAllBooks()   
        if(books.length!=0){
            res.send(books)
        }
        else{
            res.status(404).json({error:"No books found."})
        }     
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the books."})
    }
})

async function readByTitle(title){
    try {
        const movie = await Book.findOne({title:title})
        console.log(movie)
        return movie
    } catch (error) {
        throw error
    }
}

app.get("/books/:booksTitle",async (req,res) => {
     try {
        const movie = await readByTitle(req.params.booksTitle)
        if(movie){
            res.send(movie)
        }
        else{
            res.status(404).json({error:"Book not found"})
        }
     } catch (error) {
        console.log(error)
        res.status(500).json({error:"Failed to fetch the book."})
     }
})

async function readByAuthor(author) {
    try {
        const book = await Book.find({author:author})
        return book
    } catch (error) {
        throw error
    }
}

app.get("/books/bookAuthor/:author",async (req,res)=>{
    try {
        const book = await readByAuthor(req.params.author)
        if(book.length!=0){
            res.send(book)
        }
        else{
            res.status(404).json({error:"Book not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the book."})
    }
})

async function readByGenre(genre) {
    try {
       const book = await Book.find({genre:genre})
       return book        
    } catch (error) {
        throw error
    }
}

app.get("/books/bookGenre/:genre",async (req,res) => {
    try {
        const book = await readByGenre(req.params.genre)
        if(book.length!=0){
            res.send(book)
        }
        else{
            res.status(404).json({error:"Book not found."})
        }
    } catch (error) {
        res.status(500).json({error:'Failed to fetch the book.'})
    }
})

async function readByYear(year) {
    try {
        const book = await Book.find({publishedYear:year})
        return book
    } catch (error) {
        throw error
    }
}

app.get("/books/bookYear/:year",async (req,res) => {
    try {
        const book = await readByYear(req.params.year)
        if(book.length!=0){
            res.send(book)
        }
        else{
            res.status(404).json({error:"Book not found."})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the books."})
    }
})

async function updateRating(id,rating) {
    try {
        const book = await Book.findByIdAndUpdate(id,rating,{new:true})
        console.log(book)
        return book
    } catch (error) {
        throw error
    }
}

//updateRating("68ab2bd269d4f9d769ce8dfb",4.2)

app.post("/books/:bookId", async (req,res) => {
    try {
        const updatedBook = await updateRating(req.params.bookId,req.body)
        if(updatedBook){
            res.status(200).json({message:"The Book is updated",book:updatedBook})
        }
        else{
            res.status(404).json({error:"The book is not found."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Failed to fetch the book"})
    }
})

async function updateByTitle(title,updatedRating){
    try {
       const book = await Book.findOneAndUpdate({title:title},updatedRating,{new:true})
       return book        
    } catch (error) {
        throw error
    }
}

app.post("/books/title/:bookTitle", async (req,res) => {
    try {
        const updatedBook = await updateByTitle(req.params.bookTitle,req.body)
        if(updatedBook){
            res.status(200).json({message:"The book is updated",book:updatedBook})
        }
        else{
            res.status(404).json({error:"Book not found"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the book."})
    }
})

async function deleteById(id) {
    try {
        const deleteBook = await Book.findByIdAndDelete(id)
        return deleteBook
    } catch (error) {
        throw error
    }
}

app.delete("/books/:bookId",async (req,res) => {
    try {
        const deletedBook = await deleteById(req.params.bookId)
        if(deletedBook){
             res.status(200).json({message:"Book deleted successfully.",book:deletedBook})
        }
        else{
            res.status(404).json({error:"Book not foind"})
        }
    } catch (error) {
        res.status(500).json({error:"Failed to fetch the book."})
    }
})

PORT =3000

app.listen(PORT,()=>{
    console.log("Connected to PORT",PORT)
})