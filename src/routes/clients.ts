import { Router } from "express";
import { createClient,deleteClient,getClients,updateClient } from "../controllers/client.controller";
const router = Router()

router.get("/",getClients)
router.post("/",createClient)
router.patch("/:id",updateClient)
router.delete("/:id",deleteClient)

export default router
