import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { PetEntity } from "../entities/pet-entity";
import { UserEntity } from "../entities/user-entity";

class PetController {
  static newPet = async (req: Request, res: Response) => {

    const neutered =  (req.params.neutered === undefined || req.params.neutered.toLowerCase() === 'false' ? false : true)
    const vaccinated =  (req.params.vaccinated === undefined || req.params.vaccinated.toLowerCase() === 'false' ? false : true)

    let { name, species, gender, breed, age, weight, imageUrl, user_id } = req.body;
    let pet = new PetEntity();
    let user: UserEntity;

    const petRepository = getRepository(PetEntity);
    const userRepository = getRepository(UserEntity);

    try {
      user = await userRepository.findOneOrFail(user_id);
    } catch (error) {
      res.status(404).send("User not found");
      return;
    }

    pet.name = name;
    pet.species = species;
    pet.gender = gender;
    pet.breed = breed;
    pet.age = age;
    pet.weight = weight;
    pet.neutered = neutered;
    pet.vaccinated = vaccinated;
    pet.petImgUrl = imageUrl;
    pet.user = user;
  
    try {
      await petRepository.save(pet);
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  
    res.status(201).send(pet);
  };

  static getPetsForUser = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    const PetRepository = getRepository(PetEntity);
    const UserRepository = getRepository(UserEntity);

    let found_user: UserEntity;
    try 
    { 
      found_user = await UserRepository.findOneOrFail(user_id);

    }
    catch(error)
    {
      res.status(404).send();
      return;
    }

    const pets = await PetRepository.find({ relations: ['user'],
                                              where : {user : found_user}});

  
    res.send(pets);
  };

  static deletePet = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const petRepository = getRepository(PetEntity);
    let pet: PetEntity;
    try {
      pet = await petRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Pet not found");
      return;
    }
    petRepository.delete(id);
  
    res.status(204).send();
  };


  static ediPet = async (req: Request, res: Response) => {
    const id = req.params.id;
    const neutered =  (req.params.neutered === undefined || req.params.neutered.toLowerCase() === 'false' ? false : true)
    const vaccinated =  (req.params.vaccinated === undefined || req.params.vaccinated.toLowerCase() === 'false' ? false : true)

    let { name, species, gender, breed, age, weight, imageUrl } = req.body;
  
    const petRepository = getRepository(PetEntity);
    let pet;
    try {
      pet = await petRepository.findOneOrFail(id,{ relations: ['user']});
    } catch (error) {
      res.status(404).send("Pet not found");
      return;
    }
  
    pet.name = name;
    pet.species = species;
    pet.gender = gender;
    pet.breed = breed;
    pet.age = age;
    pet.weight = weight;
    pet.neutered = neutered;
    pet.vaccinated = vaccinated;
    pet.petImgUrl = imageUrl;
  
  
    try {
      await petRepository.save(pet);
    } catch (e) {
      res.status(409).send();
      return;
    }
    res.status(202).send(pet);
  };

}

export default PetController;