import mongoose from "mongoose"

const connectDB  = async() =>{
    return mongoose.connect(process.env.SEARCH_URI)
}

export {connectDB}