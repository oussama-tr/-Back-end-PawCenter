import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";

import { VetEntity } from "./vet-entity";
import { PetEntity } from "./pet-entity";
import { UserEntity } from "./user-entity";

export enum AppointmentReason {
    EXAMINATION = "Examination",
    VACCINATION = "Vaccination",
    NEUTERING = "Neutering",
    INJURY = "Injury"
}

@Entity("appointment")
export class AppointmentEntity {

    @PrimaryGeneratedColumn()
    appointment_id: number;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(type => PetEntity, pet => pet.appointments, { onDelete: 'CASCADE' })
    pet: PetEntity;

    @ManyToOne(type => VetEntity, vet => vet.appointments, { onDelete: 'CASCADE' })
    vet: VetEntity;

    @Column()
    appointment_date: string;

    @Column()
    appointment_reason: AppointmentReason;

    @Column({default: false})
    confirmed: boolean;

}