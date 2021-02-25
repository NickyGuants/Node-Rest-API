let products=require('../data/products.json')
const { v4: uuidv4 }=require('uuid')
const { writeDataToFile }= require('../utils')
//Function to display all products
function findAll() {
    return new Promise((resolve, reject)=>{
        resolve(products)
    });
}
//function to display a single product
function findById(id) {
    return new Promise((resolve, reject)=>{
        const product= products.find((p) => p.id ===id)
        resolve(product)
    });
}
//Function to create a new product
function Create(product) {
    return new Promise((resolve, reject)=>{
        const newProduct ={id: uuidv4(), ...product}
        products.push(newProduct)
        writeDataToFile('./data/products.json', products)
        resolve(newProduct)
    });
}
//Function to update/edit a product and its details
function update(id,product) {
    return new Promise((resolve, reject)=>{
        const index =products.findIndex((p) => p.id===id)
        products[index] ={ id, ...product }
        writeDataToFile('./data/products.json', products)
        resolve(products[index])
    });
}
//A function to delete an existing product
function remove(id) {
    return new Promise((resolve, reject)=>{
        products = products.filter((p)=> p.id !==id)
        writeDataToFile('./data/products.json', products)
        resolve()
    });
}

//Exporting the functions for use in the controller
module.exports={
    findAll,
    findById,
    Create,
    update,
    remove
}