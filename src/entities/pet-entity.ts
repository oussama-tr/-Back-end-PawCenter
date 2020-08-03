import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Length } from "class-validator";
import { UserEntity } from "./user-entity";
import { AppointmentEntity } from "./appointment-entity";

export enum PetGender {
    MALE = "male",
    FEMALE = "female"
}

export enum PetSpecies {
    DOG = "dog",
    CAT = "cat",
    BIRD = "bird",
    REPTILE = "reptile",
    RODENT = "rodent"
}

@Entity("pet")
export class PetEntity {

    @PrimaryGeneratedColumn()
    pet_id: number;

    @Column()
    @Length(4, 20)
    name: string;

    @Column()
    species: PetSpecies;

    @Column()
    gender: PetGender;

    @Column()
    breed: string;

    @Column()
    age: number;

    @Column({})
    weight: number;

    @Column()
    neutered: boolean;

    @Column()
    vaccinated: boolean;

    @Column({default: "pet.png"})
    petImgUrl: string;

    @ManyToOne(type => UserEntity, user => user.pets ,{ onDelete: 'CASCADE' })
    user: UserEntity;

    @OneToMany(type => AppointmentEntity, appointment => appointment.pet,  { onDelete: 'CASCADE' })
    appointments: AppointmentEntity[];

}