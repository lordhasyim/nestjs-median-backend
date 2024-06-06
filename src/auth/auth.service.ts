import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}

    async login(email: string, password: string): Promise<AuthEntity> {
        // step 1: Fetch a user with the given email
        const user = await this.prisma.user.findUnique({
            where: {email: email}
        });

        if (!user) {
            throw new NotFoundException('No user found for email: ${email');
        }

        // step 2: check if  the password is correct        
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if password does not match, throw an error
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        // step 3: generate a JWT containing the user's ID and return it
        return {
            accessToken: this.jwtService.sign({
                userId: user.id
            })
        };

    }
}
