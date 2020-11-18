import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, Unique, Index, CreateDateColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { Term } from './term.entity';

@Entity()
@Unique("UQ_slug",["slug"])
export class TermValue{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    description: string;

    @Column({name: "slug"})
    @Column()
    slug: string;

    @Column()
    order: number; 

    @Column()
    status: string; 

    @Column("simple-json")
    images: { icon: string, image: string , banner: string};

    @Column()
    updatedBy: string;

    @Column()
    updatedAt: Date;

    @Column()
    createdBy: string;

    @Column()
    createdAt: Date;

    //creaitng self-referencing for termValue
    @ManyToOne(type => TermValue, termValue => termValue.childTermValues)
    parentTermValue: TermValue;

    @OneToMany(type => TermValue, termValue => termValue.parentTermValue)
    childTermValues: TermValue[];
 
    //Many 2 Many relation with term
    @ManyToMany(() => Term, term => term.termValues)
    @JoinTable()
    terms: Term[];

}