import { Router } from "express";
import userController from "../controllers/user-controller";

const router = Router();

//Get all users
router.get("/", userController.listAll);   

// Get one user
router.get("/:id([0-9]+)",userController.getOneById);

//Create a new user
router.post("/register", userController.newUser);

//Edit one user
router.patch("/:id([0-9]+)/:private",userController.editUser);

//update image url
router.patch("/updatePhoto/:id([0-9]+)/:ImageUrl",userController.updateImageUrl);

//Delete one user
router.delete("/:id([0-9]+)",userController.deleteUser);

export default router;