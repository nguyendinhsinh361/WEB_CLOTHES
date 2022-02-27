const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const acitonController = require('../controller/acitonController')

router.get('/contact', (req, res) => {
    res.render('contact')
});
router.get('/blog', (req, res) => {
    res.render("blog");
});
router.get('/checkout', (req, res) => {
    res.render('checkout')
})
router.get('/productDetail/:id', acitonController.checkDetail)
router.get('/shopCart', auth.authen, acitonController.shopCart)
router.get('/shopCart/checkout', acitonController.shopCheckout)
router.post('/shopCart/checkout', acitonController.payment)
router.get('/blog/blogDetail', (req, res) => {
    res.render('blogDetail')
})

module.exports = router;