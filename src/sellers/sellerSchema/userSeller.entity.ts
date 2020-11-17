
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ObjectIdColumn, ObjectID, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class SellerUser{

    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    userId: string;

    // @ObjectIdColumn({name: "sellerId"})
    @Column()
    sellerId: string;
    
    @Column()
    createdAt: string;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: string;

    @Column()
    updatedBy: string;

    
    // @OneToMany( ()=> sellers, sellers=>sellers._id)
    // seller : sellers

    // @OneToMany( ()=> users, user=>user._id)
    // user : users


    // @ManyToOne(() => sellers, sellers => sellers._id)
    // public seller!: sellers;

    // @ManyToOne(() => users, user => user._id)
    // public user!: users;
}
