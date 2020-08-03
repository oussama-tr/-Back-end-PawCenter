import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { NotificationEntity } from "../entities/notification-entity";
import { UserEntity } from "../entities/user-entity";

class NotificationController {
  static createAdminAppointmentNotification = async (req: Request, res: Response) => {

    let { user_id , content } = req.body;
    let notification = new NotificationEntity();

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(user_id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const notificationRepository = getRepository(NotificationEntity);
    
    notification.user = user;
    notification.forAdmin = true;
    notification.content = content;

    try {
      await notificationRepository.save(notification);
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  
    res.status(201).send(notification);
  };


  static createUserAppointmentNotification = async (req: Request, res: Response) => {
    let { user_id , content } = req.body;
    let notification = new NotificationEntity();

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(user_id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const notificationRepository = getRepository(NotificationEntity);
    
    notification.forAdmin = false;
    notification.user = user;
    notification.content = content;

    try {
      await notificationRepository.save(notification);
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  
    //If all ok, send 201 response
    res.status(201).send(notification);
  };

  static getForUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const notificationRepository = getRepository(NotificationEntity);

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const notifications = await notificationRepository.find({relations: ['pet', 'user'], where: { user: user, forAdmin: false }});

    res.send(notifications);
  };


  static getForAdmin = async (req: Request, res: Response) => {


    const notificationRepository = getRepository(NotificationEntity);

    const notifications = await notificationRepository.find({relations: ['pet', 'user'], where: { forAdmin: true }});

    res.send(notifications);
  };

  static getNewCountForUser = async (req: Request, res: Response) => {

    const id = req.params.id;

    const notificationRepository = getRepository(NotificationEntity);

    const userRepository = getRepository(UserEntity);
    let user: UserEntity;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    const notifications = await notificationRepository.find({relations: ['pet', 'user'], where: { user: user, forAdmin: false, seen: false }});

    res.send(notifications.length);
  };

}

export default NotificationController;