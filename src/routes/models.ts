import { Router } from "express";
import { createClient,createProduct,createSale,createSaleDetail } from "../controllers/models.controller";

const router = Router()

router.get("/product",createProduct)
router.get("/client",createClient)
router.get("/sale",createSale)
router.get("/sale-detail",createSaleDetail)
// router.get("/drop",drop)

export default router
