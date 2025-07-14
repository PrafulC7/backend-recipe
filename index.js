const express = require("express")
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json())
const {initializeDatabase} = require("./db/db.connect")
const Recipe = require("./models/recipe.models")
initializeDatabase();

async function seedRecipe(newRecipe){
try{
const recipe = new Recipe(newRecipe)
const savedRecipe = await recipe.save()
return savedRecipe;
}catch(err){
  throw err;
}
}

app.post("/recipe", async (req,res)=>{
try{
const recipeDetails = await seedRecipe(req.body)
if(recipeDetails){
  res.status(201).json({message:"Recipe added successfully", recipe:recipeDetails})
}else{
  res.status(400).json({err:"Couldn't add recipe"})
}
}catch(err){
  res.status(500).json({err:"Failed to fetch recipe"})
}
})

async function getRecipe(){
  try{
    const recipe = Recipe.find()
  return recipe
  }catch(err){
  throw err
}
}

app.get("/recipe", async (req,res)=>{
  try{
const recipeDetails = await getRecipe()
if(recipeDetails){
  res.send(recipeDetails)
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function getRecipeByTitle(recipeTitle){
  try{
const recipe = await Recipe.find({title:recipeTitle})
return recipe
  }catch(err){
    throw err
  }
}
app.get("/recipe/:title", async (req,res)=>{
  try{
const recipeDetails = await getRecipeByTitle(req.params.title)
if(recipeDetails){
  res.send(recipeDetails)
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function getRecipeByAuthor(recipeAuthor){
  try{
const recipe = await Recipe.find({author:recipeAuthor})
return recipe
  }catch(err){
    throw err
  }
}

app.get("/recipe/author/:recipeAuthor", async (req,res)=>{
  try{
const recipeDetails = await getRecipeByAuthor(req.params.recipeAuthor)
if(recipeDetails){
  res.send(recipeDetails)
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function getRecipeByDifficulty(recipeDifficulty){
  try{
const recipe = await Recipe.find({difficulty:recipeDifficulty})
return recipe
  }catch(err){
    throw err
  }
}

app.get("/recipe/difficulty/:recipeDifficulty", async (req,res)=>{
  try{
const recipeDetails = await getRecipeByDifficulty(req.params.recipeDifficulty)
if(recipeDetails){
  res.send(recipeDetails)
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function updateById(recipeId, dataToUpdate){
  try{
const recipe = await Recipe.findByIdAndUpdate(recipeId, dataToUpdate, {new:true})
return recipe
  }catch(err){
    throw err
  }
}

app.post("/recipe/:recipeId", async (req,res)=>{
  try{
const recipeDetails = await updateById(req.params.recipeId, req.body)
if(recipeDetails){
  res.status(201).json({message:"recipe updated successfully.", recipe:recipeDetails})
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function updateByTitle(recipeTitle, dataToUpdate){
  try{
const recipe = await Recipe.findOneAndUpdate({title:recipeTitle}, dataToUpdate, {new:true})
return recipe
  }catch(err){
    throw err
  }
}

app.post("/recipe/title/:recipeTitle", async (req,res)=>{
  try{
const recipeDetails = await updateByTitle(req.params.recipeTitle, req.body)
if(recipeDetails){
  res.status(201).json({message:"recipe updated successfully.", recipe:bookDetails})
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

async function deleteById(recipeId){
  try{
const recipe = await Recipe.findByIdAndDelete(recipeId)
return recipe
  }catch(err){
    throw err
  }
}

app.delete("/recipe/:recipeId", async (req,res)=>{
  try{
const recipeDetails = await deleteById(req.params.recipeId)
if(recipeDetails){
  res.status(201).json({message:"This recipe deleted successfully.", recipe:recipeDetails})
}else{
  res.status(404).json({err:"recipe not found"})
}
  }catch(err){
    res.status(500).json({err:"failed to fetch recipe"})
  }
})

const PORT = 3000
app.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
})