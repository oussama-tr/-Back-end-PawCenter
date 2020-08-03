import { Router } from "express";
import AuthController from "../controllers/auth-controller";

const router = Router();

//Login 
router.post("/login", AuthController.login);

//Change my password
router.post("/change-password", AuthController.changePassword);

export default router;