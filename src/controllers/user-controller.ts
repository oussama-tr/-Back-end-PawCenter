import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { UserEntity } from "../entities/user-entity";
 
class UserController{

    static listAll = async (req: Request, res: Response) => {
      //Get users from database
      const userRepository = getRepository(UserEntity);
      const users = await userRepository.find();
    
      //Send the users object
      res.send(users);
    };
    
    static getOneById = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id: number = parseInt(req.params.id);
      let user = new UserEntity();
      //Get the user from database
      const userRepository = getRepository(UserEntity);
      try {
        user = await userRepository.findOneOrFail(id/*, {relations: ['followers', 'following']}*/);
      } catch (error) {
        res.status(404).send("User not found");
      }
      res.send(user);

    };
    
    static newUser = async (req: Request, res: Response) => {
      //Get parameters from the body

      let { username, firstname, lastname, password, email, number } = req.body;
      let user = new UserEntity();
      user.username = username;
      user.user_password = password;
      user.user_email = email;
      user.user_firstName = firstname;
      user.user_lastName = lastname;
      user.user_number = number;
    
      //Validade if the parameters are ok
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
    
      //Try to save. If fails, the username is already in use
      const userRepository = getRepository(UserEntity);
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send(e);
        return;
      }
    
      //If all ok, send 201 response
      res.status(201).send();
    };
    
    static editUser = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id = req.params.id;
      //Get values from the body
      const { username, user_firstName, user_lastName, email, number } = req.body;
    
      //Try to find user on database
      const userRepository = getRepository(UserEntity);
      let user;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (error) {
        //If not found, send a 404 response
        res.status(404).send("User not found");
        return;
      }
    
      //Validate the new values on model
      user.username = username;
      user.user_firstName = user_firstName;
      user.user_lastName = user_lastName;
      user.user_email = email;
      user.user_number = number;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
    
      //Try to save, if fails, that means username already in use
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(409).send("username already in use");
        return;
      }
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    };
    
    static deleteUser = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id = req.params.id;
    
      const userRepository = getRepository(UserEntity);
      let user: UserEntity;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (error) {
        res.status(404).send("User not found");
        return;
      }
      userRepository.delete(id);
    
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    };


    static updateImageUrl = async (req: Request, res: Response) => {
      //Get the ID from the url
      const id = req.params.id;
      const ImageUrl = req.params.ImageUrl;
    
      //Try to find user on database
      const userRepository = getRepository(UserEntity);
      let user;
      try {
        user = await userRepository.findOneOrFail(id);
      } catch (error) {
        //If not found, send a 404 response
        res.status(404).send("User not found");
        return;
      }
    
      user.profileImgUrl = ImageUrl;
      //Try to save, if fails, that means username already in use
      try {
        await userRepository.save(user);
      } catch (e) {
        res.status(404).send();
        return;
      }
      //After all send a 204 (no content, but accepted) response
      res.status(204).send();
    };
    
}
    
export default UserController;