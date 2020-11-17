import { User } from "src/users/userSchema/user.entity";
import { ObjectID } from "typeorm";

export interface SellerInfoInter {
    cellNo: string;
    mail: string;
    username: string;
    _id: number;
    shopName: string;
    password:string;
    CreatedBy: string;
    CreatedAt: string;
    UpdatedBy?: string;
    UpdatedAt?: string;
    status: string;
}