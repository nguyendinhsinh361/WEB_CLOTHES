const ProductModel = require('../model/productModel');
let idProduct = null;

exports.checkDetail = async (req, res) => {
    idProduct = req.params.id;
    const productDetail = await ProductModel.findOne({_id: idProduct});
    arrayShop.push(productDetail)
    ProductModel.find({_id: {$nin:idProduct}}, (err, products) => {
        if(err) console.error(err);
        res.render('productDetail', {productDetail, products})  
    })
}

exports.shopCart = async (req, res) => {   
    res.render('shopCart', {arrayShop})
}

exports.shopCheckout = async (req, res) => {   
    res.render('checkout', {arrayShop})
}

exports.payment = async (req, res) => {
    res.redirect('/')
}

