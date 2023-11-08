import { productModel } from "../model/product.js";

export const getAllproduct = async(req,res) =>{
    const product = await productModel.find()
    if(!product){
        return res.status(500).json({
            success: false,
            message: 'product empty'
        })
    }
    res
    .status(200)
    .json({
        total: product.length,
        success: true,
        product: product
    })
}

export const createProduct = async (req, res) => {
    try {
        const product = await productModel.create(req.body);

        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product creation failed'
            });
        }

        res.status(200).json({
            total: product.length, // Corrected "lenght" to "length"
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const deleteProduct = async(req,res) =>{
    try {
        const product = await productModel.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(500).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            total: product.length, // Corrected "lenght" to "length"
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
