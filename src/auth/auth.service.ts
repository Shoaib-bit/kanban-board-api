import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/common/services'
import { PasswordUtil } from 'src/common/utils'
import { SignupDto } from './auth.dto'

@Injectable()
export class AuthService {
    constructor(private readonly databaseService: DatabaseService) {}

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
}
