import {
    BadRequestException,
    Body,
    Controller,
    InternalServerErrorException,
    Post
} from '@nestjs/common'
import { LoginDto, SignupDto } from './auth.dto'

@Controller()
export class AuthController {
    @Post('login')
    login(@Body() loginDto: LoginDto) {
        try {
            //Todo will implement
            console.log(loginDto)
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
    signup(@Body() signupDto: SignupDto) {
        try {
            //Todo will implement
            console.log(signupDto)
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
