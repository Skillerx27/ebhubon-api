import { Double } from 'mongodb';
import { Category } from 'src/category/categorySchema/category.entity';
import { Entity, Column, ObjectIdColumn, PrimaryGeneratedColumn, Unique, Index, CreateDateColumn, OneToMany, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { TermValue } from './termValue.entity';


@Entity()
// @Unique("UQ_Index",["termName"])
export class Term{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    type: string;

    @Column()
    description: string;

    @Column()
    isDynamic: string;

    @Column()
    status: string;
    
    @Column()
    updatedBy: string;
    
    @Column()
    updatedAt: Date;
    
    @Column()
    createdBy: string;

    @Column()
    createdAt: Date;

    //Many 2 Many relation with termValue
    @ManyToMany(() => TermValue, termValue => termValue.terms)
    @JoinTable()
    termValues: TermValue[];
}
