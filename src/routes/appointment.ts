import { Router } from "express";
import appointmentController from "../controllers/appointment-controller";

const router = Router();

//Create an appointment
router.post("/create", appointmentController.newAppointment);

//Get appointments for user
router.get("/fetchForUser/:id([0-9]+)", appointmentController.getForUser);

//Get appointments for admin
router.get("/fetchForAdmin", appointmentController.getAll);

//Delete appointment
router.delete("/delete/:id([0-9]+)", appointmentController.deleteAppointment);

//Confirm appointment
router.patch("/confirm/:id([0-9]+)", appointmentController.ConfirmAppointment);

export default router;