const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controller/productController')
const auth = require('../middleware/auth');


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

let uploadImg = multer({
    storage: storage
})

router.get('/shop/addProduct', auth.admin, (req, res) => {
    res.render("addProduct");
});


router.get('/shop/shopAdmin', auth.admin, productController.showProductAdmin)
router.post('/shop/addProduct', uploadImg.single('img'), productController.createProduct)
router.get('/shop/shopAdmin/edit/:id', productController.showFormUpdate)
router.put('/shop/shopAdmin/:id', uploadImg.single('img'), productController.updateProduct)
router.delete('/shop/shopAdmin/:id', productController.deleteProduct)

module.exports = router;