import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        name:String,
        color:String,
        category:String
    }
)

export const productModel =  mongoose.model("Search" , productSchema)

