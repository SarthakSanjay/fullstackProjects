import { productModel } from "../model/product.js";
// import { product } from "../utils/product.js";
export const search = async(req,res) =>{
    const { search } = req.query;

    if(!search) {
        return res.status(400).json({error:"search query is required"})
    }
    try {
            const productSearch = await productModel.find({
                $or:[
                    {name:{ $regex: search , $options: 'i'}},
                    {category:{ $regex: search , $options: 'i'}},
                    {color:{ $regex: search , $options: 'i'}},
                ]
            })
            res.status(200).json({
                success:true,
                product: productSearch,
                total: productSearch.length
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error:"an error occured while seaching the product"
        })
    }
}