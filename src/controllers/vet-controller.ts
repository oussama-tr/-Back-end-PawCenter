import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { VetEntity } from "../entities/vet-entity";

class VetController {
  static newVet = async (req: Request, res: Response) => {

    let { firstname , lastname , imageUrl } = req.body;
    let vet = new VetEntity();

    const vetRepository = getRepository(VetEntity);

    vet.vet_firstName = firstname;
    vet.vet_lastName = lastname;
    vet.vetImgUrl = imageUrl;
  
    try {
      await vetRepository.save(vet);
    } catch (e) {
      res.status(409).send(e);
      return;
    }
  
    res.status(201).send(vet);
  };

  static getVets = async (req: Request, res: Response) => {
    const user_id = req.params.user_id;

    const VetRepository = getRepository(VetEntity);


    const vets = await VetRepository.find();

    res.send(vets);
  };

  static deleteVet = async (req: Request, res: Response) => {
    const id = req.params.id;
  
    const vetRepository = getRepository(VetEntity);
    let vet: VetEntity;
    try {
      vet = await vetRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Vet not found");
      return;
    }
    vetRepository.delete(id);
  
    res.status(204).send();
  };


  static ediVet = async (req: Request, res: Response) => {
    const id = req.params.id;

    let { firstname , lastname , imageUrl } = req.body;
  
    const vetRepository = getRepository(VetEntity);
    let vet;
    try {
      vet = await vetRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Vet not found");
      return;
    }
  
    vet.vet_firstName = firstname;
    vet.vet_lastName = lastname;
    vet.vetImgUrl = imageUrl;
  
    try {
      await vetRepository.save(vet);
    } catch (e) {
      res.status(409).send();
      return;
    }
    res.status(202).send(vet);
  };

}

export default VetController;