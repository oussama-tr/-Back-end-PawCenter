import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { PetEntity } from "./pet-entity";
import { UserEntity } from "./user-entity";


@Entity("notification")
export class NotificationEntity {

    @PrimaryGeneratedColumn()
    notification_id: number;

    @ManyToOne(type => PetEntity, { onDelete: 'CASCADE', nullable: true },  )
    @JoinColumn()
    pet: PetEntity;

    @ManyToOne(type => UserEntity, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn()
    user: UserEntity;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column({default: false})
    seen: boolean;

    @Column()
    forAdmin: boolean;
}