import { Router } from "express";
import notificationController from "../controllers/notification-controller";

const router = Router();

//Create a appointment notification for admin
router.post("/createForAdmin", notificationController.createAdminAppointmentNotification);

//Create a appointment notification for user
router.post("/createForUser", notificationController.createUserAppointmentNotification);

//Get notifications for user
router.get("/fetchForUser/:id([0-9]+)", notificationController.getForUser);

//Get notifications for admin
router.get("/fetchForAdmin", notificationController.getForAdmin);

//Get New notification count for user
router.get("/fetchCountForUser/:id([0-9]+)", notificationController.getNewCountForUser);

export default router;