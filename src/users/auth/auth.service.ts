import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../userSchema/user.entity';
import { SellersService } from 'src/sellers/sellers.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sellerService: SellersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // console.log("auth.service called")
    // console.log("STRING PASSWORD",pass)
    // let newPassword = await bcrypt.hash(pass, 12);

    const user = await this.usersService.findUser(username);
    
    // console.log("DATABASE PASSWORD=========",user.password)
    // console.log("Decript PASSWORD=========",newPassword)
    console.log("user details=====",user)
    if (user && user.password === pass)  {
        console.log("auth service recalled for checking")
      const result = user;

      console.log("auth service recalled with valid user details from database ")
      return result;
    }

    
    const newUser = await this.usersService.findSeller(username);
    if (newUser && newUser.password === pass)  {
      console.log("auth service recalled for checking")
    const result = newUser;

    console.log("auth service recalled with valid user details from database ")
    return result;
  }


  const newAdmin = await this.usersService.findAdmin(username);
    if (newAdmin && newAdmin.password === pass && newAdmin.role=="admin")  {
      console.log("auth service recalled for checking")
    const result = newAdmin;

    console.log("auth service recalled with valid user details from database ")
    return result;
  }

    return null;
  }

  async login(user: any) {
    const payload = { mail: user.mail, username: user.username , _id: user._id ,role: user.role };
    console.log("payload from login")
    // console.log(user.useremail)
    // console.log(user.username)
     console.log(payload)
    // console.log(user.password)
    if(user.status==="error") 
    {       
      return {status: "error"}
    }
    return {
      status: "ok",
      role: user.role,
      access_token: this.jwtService.sign(payload),
    };
  }
}