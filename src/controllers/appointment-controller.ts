import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PetEntity } from "../entities/pet-entity";
import { AppointmentEntity } from "../entities/appointment-entity";
import { VetEntity } from "../entities/vet-entity";
import { UserEntity } from "../entities/user-entity";

class AppointmentController {
  static newAppointment = async (req: Request, res: Response) => {


    let { pet_id , vet_id , date, reason, user_id } = req.body;
    let appointment = new AppointmentEntity();

    const appointmentRepository = getRepository(AppointmentEntity);

    const petRepository = getRepository(PetEntity);
    let pet: PetEntity;
    try {
      pet = await petRepository.findOneOrFail(pet_id);
    } catch (error) {
      res.status(404).send("Pet not found");
      return;
    }

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(user_id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const vetRepository = getRepository(VetEntity);
    let vet: VetEntity;
    try {
      vet = await vetRepository.findOneOrFail(vet_id);
    } catch (error) {
      res.status(404).send("Vet not found");
      return;
    }

    appointment.pet = pet;
    appointment.vet = vet;
    appointment.appointment_date = date;
    appointment.appointment_reason = reason;
    appointment.user = user;

    try {
      await appointmentRepository.save(appointment);
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  
    res.status(201).send(appointment);
  };

  static getAll = async (req: Request, res: Response) => {

    const AppointmentRepository = getRepository(AppointmentEntity);


    const appointments = await AppointmentRepository.find( {relations: ['pet', 'vet', 'user']});

    res.send(appointments);
  };

  static getForUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const AppointmentRepository = getRepository(AppointmentEntity);

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const appointments = await AppointmentRepository.find({relations: ['pet', 'vet', 'user'], where: { user: user }});

    res.send(appointments);
  };


  static deleteAppointment = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const AppointmentRepository = getRepository(AppointmentEntity);
    let app: AppointmentEntity;
    try {
      app = await AppointmentRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Appointment not found");
      return;
    }
    AppointmentRepository.delete(id);
  
    res.status(204).send();
  };

  static ConfirmAppointment = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const AppointmentRepository = getRepository(AppointmentEntity);
    let app: AppointmentEntity;
    try {
      app = await AppointmentRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Appointment not found");
      return;
    }

    app.confirmed = true;

    try {
      await AppointmentRepository.save(app);
    } catch (e) {
      res.status(409).send();
      return;
    }
    res.status(204).send();
  };
}

export default AppointmentController;