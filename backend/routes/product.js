import express from 'express'
const router = express.Router()
import {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
} from '../controllers/product.js'
import {
    protect,admin
} from '../middleware/auth.js'

router.route('/')
   .get(getProducts)
   .post(protect,admin,createProduct)

router.route('/:id/reviews')
   .post(protect, createProductReview)

router.get('/top',getTopProducts)

router.route('/:id')
   .get(getProductById)
   .delete(protect, admin, deleteProduct)
   .put(protect, admin, updateProduct)

export default router
