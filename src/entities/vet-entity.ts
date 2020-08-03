import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AppointmentEntity } from "./appointment-entity";


@Entity("vet")
export class VetEntity {

    @PrimaryGeneratedColumn()
    vet_id: number;

    @Column({
        length: 100
    })
    vet_firstName: string;

    @Column({
        length: 100
    })
    vet_lastName: string;

    @Column()
    vetImgUrl: string;

    @OneToMany(type => AppointmentEntity, appointment => appointment.vet,  { onDelete: 'CASCADE' })
    appointments: AppointmentEntity[];

}