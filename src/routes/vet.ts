import { Router } from "express";
import vetController from "../controllers/vet-controller";

const router = Router();

//Create a vet
router.post("/create", vetController.newVet);

//Get all vets
router.get("/fetchVets", vetController.getVets);

//Delete vet
router.delete("/delete/:id([0-9]+)", vetController.deleteVet);

//Edit vet
router.patch("/edit/:id([0-9]+)", vetController.ediVet);

export default router;