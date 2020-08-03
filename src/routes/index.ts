import { Router } from "express";
import user from "./user";
import auth from "./auth";
import pet from "./pet";
import vet from "./vet";
import appointment from "./appointment";
import notification from "./notification";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/pet", pet);
routes.use("/vet", vet);
routes.use("/appointment", appointment);
routes.use("/notification", notification);

export default routes;