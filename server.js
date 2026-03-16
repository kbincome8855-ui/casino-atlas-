const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

const casinos = require("./data/casinos")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
 res.send("CasinoAtlas API Running")
})

app.get("/casinos",(req,res)=>{
 res.json(casinos)
})

app.get("/casino/:slug",(req,res)=>{

 const casino = casinos.find(c => c.slug === req.params.slug)

 if(!casino){
  return res.status(404).json({error:"Casino not found"})
 }

 res.json(casino)

})

app.get("/go/:slug",(req,res)=>{
app.get("/category/:type",(req,res)=>{

 const type = req.params.type

 const results = casinos.filter(c => c.type === type)

 res.json({
  category:type,
  casinos:results
 })

})
 const casino = casinos.find(c => c.slug === req.params.slug)

 if(!casino){
  return res.status(404).send("Invalid casino")
 }

 res.redirect(casino.affiliate)

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
 console.log(`Server running on ${PORT}`)
})
app.get("/search",(req,res)=>{

 const {type,crypto} = req.query

 let results = casinos

 if(type){
  results = results.filter(c => c.type === type)
 }

 if(crypto){
  results = results.filter(c => c.crypto === true)
 }

 res.json(results)

})
