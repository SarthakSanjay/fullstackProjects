import 'dotenv/config'
import express from 'express'
import { connectDB } from './db/connect.js'
import { createProduct, deleteProduct, getAllproduct } from './controllers/product.js'
import { filterProductsByColor, search } from './controllers/search.js'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("<h1>hello</h1>")
})
app.get('/test',(req,res)=>{
res.send("this is test")
})

app.post('/product/new' , createProduct )
app.get('/product/all',getAllproduct)
app.delete('/product/delete/:id',deleteProduct)

app.get('/product/search' , search)
app.get('/product/filter',filterProductsByColor)


const startServer = async() =>{
    try {
       await connectDB()
       .then(()=>{
            console.log("connected to database")
        })
        .then(()=>{
            app.listen(PORT ,()=>{
                console.log(`app started on port ${PORT}`)
            })
        })
    } catch (error) {
        console.log(error.message)
    }
}

startServer()
