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
