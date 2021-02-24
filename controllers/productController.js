const Product = require('../models/productModel')
const { getPostData }= require('../utils')

//@desc Gets all products
//@route Get /api/products/
async function getProducts(req, res){
    try {
        const products =await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products));
    } catch (error) {
        console.log(error)
    }

}
//@desc Gets a single product
//@route Get /api/product/:id
async function getProduct(req, res, id){
    try {
        const product =await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not found'}));
        }else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error)
    }
}

//@desc Create a product
//@route POST /api/products/
async function createProduct(req, res){
    try {
        const body= await getPostData(req)
        const { title,description,price } = JSON.parse(body)

        const product={
            title,
            description,
            price
        }
        const newProduct = await Product.Create(product)

        res.writeHead(201, {'Content-type': 'application/json'})
        return res.end(JSON.stringify(newProduct))
    } catch (error) {
        console.log(error)
    }

}
async function updateProduct(req, res, id){
    try {
        const product = await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not found'}));
        }else{
            const body= await getPostData(req)
            const { title,description,price } = JSON.parse(body)

            const productData={
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            }
            const updProduct = await Product.update(id,productData)

            res.writeHead(201, {'Content-type': 'application/json'})
            return res.end(JSON.stringify(updProduct))
        }
    } catch (error) {
        console.log(error)
    }

}

//@desc Delete a single product
//@route DELETE /api/product/:id
async function deleteProduct(req, res, id){
    try {
        const product =await Product.findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'Product Not found'}));
        }else{
            await Product.remove(id)
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: `Product ${id} removed`}));
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} 