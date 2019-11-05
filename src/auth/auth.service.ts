import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from "../customer/customer.service";


@Injectable()
export class AuthService {

    constructor(
        private readonly customerService: CustomerService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string): Promise<any> {
        const user = await this.customerService.getCustomer(email);
        console.log("ddddd",user)
        if (user) {
            const { ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user,rolename:"user" };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
