import {
    BadRequestException,
    Body,
    Controller,
    InternalServerErrorException,
    Post
} from '@nestjs/common'
import { LoginDto, SignupDto } from './auth.dto'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        try {
            const user = await this.authService.loginUser(
                loginDto.email,
                loginDto.password
            )

            const payload = {
                id: user.id,
                username: user.username,
                email: user.email
            }

            const token = await this.authService.accessToken(payload)

            return {
                message: 'Login Successfully',
                success: true,
                data: {
                    user: payload,
                    accessToken: token.access_token
                }
            }
        } catch (error) {
            if (error.message) {
                throw new BadRequestException(error.message)
            }
            throw new InternalServerErrorException(
                'An unexpected error occurred'
            )
        }
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        try {
            if (signupDto.password !== signupDto.confirmPassword) {
                throw new Error('Password not match with confirm Password')
            }
            const user = await this.authService.saveUser(signupDto)

            return {
                message: 'Signup Successfully',
                success: true,
                data: {
                    username: user.username,
                    email: user.email
                }
            }
        } catch (error) {
            if (error.message) {
                throw new BadRequestException(error.message)
            }
            throw new InternalServerErrorException(
                'An unexpected error occurred'
            )
        }
    }
}
