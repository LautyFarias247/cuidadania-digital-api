import { Router } from "express";
import { getProducts,createProduct,updateProduct,deleteProduct,getProductsWithoutDescription } from '../controllers/product.controller'
const router = Router()

router.get("/",getProducts)
router.get("/no-description",getProductsWithoutDescription)
router.post("/",createProduct)
router.patch("/:id",updateProduct)
router.delete("/:id",deleteProduct)


export default router
