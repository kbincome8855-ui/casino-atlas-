const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

/*
CASINO DATABASE
Expand this list anytime
*/

const casinos = [

{
name:"Chumba Casino",
slug:"chumba-casino",
type:"sweepstakes",
bonus:"$10 Free Signup Bonus",
min_withdrawal:100,
withdrawal_speed:"24-48 hours",
crypto:false,
country:"USA",
affiliate:"https://example.com/chumba"
},

{
name:"Pulsz",
slug:"pulsz",
type:"sweepstakes",
bonus:"$5 Free Signup Bonus",
min_withdrawal:50,
withdrawal_speed:"24-48 hours",
crypto:false,
country:"USA",
affiliate:"https://example.com/pulsz"
},

{
name:"Stake.us",
slug:"stake-us",
type:"sweepstakes",
bonus:"$25 Free Signup Bonus",
min_withdrawal:50,
withdrawal_speed:"24 hours",
crypto:true,
country:"USA",
affiliate:"https://example.com/stake"
},

{
name:"High 5 Casino",
slug:"high5-casino",
type:"sweepstakes",
bonus:"$5 Free Signup Bonus",
min_withdrawal:50,
withdrawal_speed:"48 hours",
crypto:false,
country:"USA",
affiliate:"https://example.com/high5"
}

]

/*
HOME
*/

app.get("/",(req,res)=>{
 res.send("CasinoAtlas API Running")
})

/*
ALL CASINOS
*/

app.get("/casinos",(req,res)=>{
 res.json(casinos)
})

/*
SINGLE CASINO PAGE
*/

app.get("/casino/:slug",(req,res)=>{

 const casino = casinos.find(c => c.slug === req.params.slug)

 if(!casino){
  return res.status(404).json({error:"Casino not found"})
 }

 res.json(casino)

})

/*
CASINO SEARCH
example:
/search?type=sweepstakes
/search?crypto=true
*/

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

/*
SEO CATEGORY GENERATOR
example:
/category/sweepstakes
/category/crypto
*/

app.get("/category/:type",(req,res)=>{

 const type = req.params.type

 const results = casinos.filter(c => c.type === type)

 res.json({
 category:type,
 casinos:results
 })

})

/*
FAST PAYOUT PAGE
*/

app.get("/fast-payout-casinos",(req,res)=>{

 const results = casinos.filter(c =>
  c.withdrawal_speed.includes("24")
 )

 res.json(results)

})

/*
CASINO COMPARISON ENGINE
example:
/compare/pulsz/stake-us
*/

app.get("/compare/:a/:b",(req,res)=>{

 const casinoA = casinos.find(c => c.slug === req.params.a)
 const casinoB = casinos.find(c => c.slug === req.params.b)

 if(!casinoA || !casinoB){
  return res.status(404).send("Casino not found")
 }

 res.json({
 compare:[casinoA,casinoB]
 })

})

/*
AFFILIATE CLICK TRACKING
example:
/go/chumba-casino
*/

app.get("/go/:slug",(req,res)=>{

 const casino = casinos.find(c => c.slug === req.params.slug)

 if(!casino){
  return res.status(404).send("Invalid casino")
 }

 console.log("Affiliate Click:",casino.name)

 res.redirect(casino.affiliate)

})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
 console.log(`CasinoAtlas server running on port ${PORT}`)
})
