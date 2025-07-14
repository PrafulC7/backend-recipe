const express = require("express")
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json())
const {initializeDatabase} = require("./db/db.connect")
const Books = require("./models/books.models")
initializeDatabase();

async function seedData(newBook){
  try{
const book = new Books(newBook)
const savedBook = await book.save()
return savedBook;
  }catch(error){
    throw error
  }
}

app.post("/books", async (req,res)=>{
  try{
const book = await seedData(req.body)
res.status(201).json({message:"book added successfully", book:book})
  }catch(err){
res.status(500).json({err:"failed to add book"})
  }
})

async function getAllBooks(){
  try{
const allBooks = await Books.find()
return allBooks;
  }catch(err){
    throw err
  }
}

app.get("/books", async (req,res)=>{
  try{
const books = await getAllBooks()
res.send(books)
  }catch(err){
res.status(404).json({error:"books not found"})
  }
})

async function getBookByTitle(bookTitle){
  try{
const book = await Books.find({title:bookTitle})
return book
  }catch(err){
    throw err
  }
}

app.get("/books/:title", async (req,res)=>{
  try{
const bookDetails = await getBookByTitle(req.params.title)
if(bookDetails){
  res.send(bookDetails)
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function getBookByAuthor(bookAuthor){
  try{
const book = await Books.find({author:bookAuthor})
return book
  }catch(err){
    throw err
  }
}

app.get("/books/author/:bookAuthor", async (req,res)=>{
  try{
const bookDetails = await getBookByAuthor(req.params.bookAuthor)
if(bookDetails){
  res.send(bookDetails)
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function getBookByGenre(bookGenre){
  try{
const book = await Books.find({genre:bookGenre})
return book
  }catch(err){
    throw err
  }
}

app.get("/books/genre/:bookGenre", async (req,res)=>{
  try{
const bookDetails = await getBookByGenre(req.params.bookGenre)
if(bookDetails){
  res.send(bookDetails)
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function getBookByPublishedYear(bookPublishedYear){
  try{
const book = await Books.find({publishedYear:bookPublishedYear})
return book
  }catch(err){
    throw err
  }
}

app.get("/books/publishedYear/:bookPublishedYear", async (req,res)=>{
  try{
const bookDetails = await getBookByPublishedYear(req.params.bookPublishedYear)
if(bookDetails){
  res.send(bookDetails)
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function updateById(bookId, dataToUpdate){
  try{
const book = await Books.findByIdAndUpdate(bookId, dataToUpdate, {new:true})
return book
  }catch(err){
    throw err
  }
}

app.post("/books/:bookId", async (req,res)=>{
  try{
const bookDetails = await updateById(req.params.bookId, req.body)
if(bookDetails){
  res.status(201).json({message:"book updated successfully.", book:bookDetails})
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function updateByTitle(bookTitle, dataToUpdate){
  try{
const book = await Books.findOneAndUpdate({title:bookTitle}, dataToUpdate, {new:true})
return book
  }catch(err){
    throw err
  }
}

app.post("/books/title/:bookTitle", async (req,res)=>{
  try{
const bookDetails = await updateByTitle(req.params.bookTitle, req.body)
if(bookDetails){
  res.status(201).json({message:"book updated successfully.", book:bookDetails})
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

async function deleteById(bookId){
  try{
const book = await Books.findByIdAndDelete(bookId)
return book
  }catch(err){
    throw err
  }
}

app.delete("/books/:bookId", async (req,res)=>{
  try{
const bookDetails = await deleteById(req.params.bookId)
if(bookDetails){
  res.status(201).json({message:"This book deleted successfully.", book:bookDetails})
}else{
  res.status(404).json({err:"book not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch book"})
  }
})

const PORT = 3000
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})