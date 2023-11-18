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

export const filterProductsByColor = async (req, res) => {
    const { colors } = req.query;
    console.log(colors)
    try {
      let products = [];
  
      if (colors && colors.length > 0) {
        // Split colors received as comma-separated string into an array
        const selectedColors = colors.split(',');
        console.log(selectedColors)
        // Find products that match the selected colors
        products = await productModel.find({ color: { $in: selectedColors } });
      } else {
        // If no colors are selected, return all products
        products = await productModel.find();
      }
  
      res.json({total:products.length, product: products });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
  };