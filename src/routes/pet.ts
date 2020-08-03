import { Router } from "express";
import petController from "../controllers/pet-controller";

const router = Router();

//Create a new pet
router.post("/create/:neutered/:vaccinated", petController.newPet);

//Get user pets
router.get("/fetchPets/:id([0-9]+)", petController.getPetsForUser);

//Delete pet
router.delete("/delete/:id([0-9]+)", petController.deletePet);

//Edit pet
router.patch("/edit/:id([0-9]+)/:neutered/:vaccinated", petController.ediPet);

export default router;