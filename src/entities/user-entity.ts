import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Unique, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";
import { Length } from "class-validator";
import { PetEntity } from "./pet-entity";

export enum UserRole {
    USER = "user",
    ADMIN = "admin"
}

@Entity("user")
@Unique(["username", "user_email"])
export class UserEntity {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    @Length(4, 20)
    username: string;

    @Column({
        length: 100
    })
    user_firstName: string;

    @Column({
        length: 100
    })
    user_lastName: string;

    @Column('varchar', {
        length: 100
      })
    user_email: string;

    @Column({
        length: 100
    })
    user_password: string;

    @Column({})
    user_number: number;

    @Column({default: "avatar.png"})
    profileImgUrl: string;

    @Column({
        default: UserRole.USER}
    )
    role: UserRole;

    @OneToMany(type => PetEntity, pet => pet.user, { onDelete: 'CASCADE' })
    pets: PetEntity[];

    @BeforeInsert()
    async hashPassword() {
    this.user_password = await bcrypt.hash(this.user_password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.user_password);
    }
}