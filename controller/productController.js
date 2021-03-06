const ProductModel = require('../model/productModel');
const fs = require('fs');
const path = require('path')

exports.showProductAdmin = async (req, res) => {
    ProductModel.find({}, (err, products) => {
        if(err) {
            console.error(err)
            return;
        }
        else {
            res.render('shopAdmin', {products: products})
        }
    })
}

exports.showProductHome = async (req, res) => {
    ProductModel.find({}, (err, products) => {
        if(err) {
            console.log(err)
            return;
        }
        else {
            res.render('index', {products: products})
        }
    })
}

exports.createProduct = async (req, res) => {
    // Validate request 
    if(!req.body) {
        res.status(400).send({message: `Content can not be empty !`});
        return;
    }
    // New product
    let product = {
        title: req.body.title,
        cost: req.body.cost,
        sex: req.body.sex || "Male",
        description: req.body.description,
        status: req.body.status || 'new',
        category: req.body.category || 'accessories',
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        user: checkIdUser
    }
    ProductModel.create(product, (err, item) => {
        if(err) console.error(err);
        res.redirect('/shop/shopAdmin');
    })
}

exports.showFormUpdate = async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findOne({_id:id});
    // Chuyển dưới dạng document;
    res.render('updateProduct', {product})
}

exports.updateProduct = async (req, res) => {
    if(!req.body) {
        res.status(400).send({message: `Content can not be empty !`});
        return;
    }
    let product = {
        title: req.body.title,
        cost: req.body.cost,
        sex: req.body.sex || "Male",
        description: req.body.description,
        status: req.body.status || 'new',
        category: req.body.category || 'accessories',
        img: {
            data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
            contentType: 'image/png'
        },
        user: checkIdUser
    }
    const id = req.params.id;
    await ProductModel.findOneAndUpdate({_id:id}, product);
    res.redirect('/shop/shopAdmin')
}

exports.deleteProduct = async (req, res) => {
    if(!req.body) {
        res.status(400).send({message: `Content can not be empty !`});
        return;
    }
    const id = req.params.id;
    await ProductModel.findByIdAndRemove({_id:id});
    res.redirect('/shop/shopAdmin')
}