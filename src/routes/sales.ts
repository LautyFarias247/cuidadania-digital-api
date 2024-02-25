import { Router } from "express";
import { createSale,getClientSales,getSales } from "../controllers/sales.controller";
const router = Router()

router.get("/",getSales)
router.get("/:email/:monto",getClientSales)
router.post("/",createSale)
// router.patch("/:id",updateClient)
// router.delete("/:id",deleteClient)

export default router
