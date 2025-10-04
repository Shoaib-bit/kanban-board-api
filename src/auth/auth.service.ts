import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { DatabaseService } from 'src/common/services'
import { PasswordUtil } from 'src/common/utils'
import { SignupDto } from './auth.dto'
import { JwtPayload } from './auth.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly databaseService: DatabaseService,
        private jwtService: JwtService
    ) {}

    async saveUser(user: SignupDto) {
        try {
            const emailExist = await this.databaseService.user.findUnique({
                where: { email: user.email }
            })

            if (emailExist) {
                throw new Error('User with this email already exists')
            }

            const hashedPassword = await PasswordUtil.hashPassword(
                user.password
            )

            const newUser = await this.databaseService.user.create({
                data: {
                    username: user.username,
                    email: user.email,
                    password: hashedPassword
                }
            })

            return newUser
        } catch (error) {
            if (error.message.includes('email already exists')) {
                throw error
            }
            throw new Error(`Failed to save user: ${error.message}`)
        }
    }

    async loginUser(email: string, password: string) {
        try {
            const user = await this.databaseService.user.findUnique({
                where: { email }
            })

            if (!user) {
                throw new Error('Invalid email or password')
            }

            const comparePassword = await PasswordUtil.comparePassword(
                password,
                user.password
            )
            if (!comparePassword) {
                throw new Error('Invalid email or password')
            }

            return user
        } catch (error) {
            if (error.message.includes('Invalid email or password')) {
                throw error
            }
            throw new Error(`Failed to save user: ${error.message}`)
        }
    }

    async accessToken(payload: JwtPayload) {
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
