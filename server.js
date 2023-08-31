const express = require('express')
const morgan = require('morgan')
const app = express()

const products = [{
    id: 1,
    name: "laptop",
    price: 3000
}]

app.use(morgan('dev'))
app.use(express.json())

app.get('/products', (req,res) => {
    res.json(products)
})

app.post('/products', (req,res) => {
    const newProduct =  {...req.body, id: products.length + 1}
    products.push(newProduct)
    res.send(newProduct)
})

app.put('/products', (req,res) => {
    res.send('actualizando productos')
})

app.delete('/products', (req,res) => {
    res.send('eliminando productos')
})

app.get('/products/:id', (req,res) => {
    console.log(req.params.id)

    const productFound = products.find(function(product){ 
        return product.id == req.params.id})

        if(!productFound) return res.status(404).json({
            message: "product not found"
        })
    res.json(productFound)
})

app.listen(3000)
console.log('running')