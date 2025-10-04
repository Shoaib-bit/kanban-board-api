import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { HttpExceptionFilter } from './filters'
import { DatabaseService } from './services'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '30d' }
        })
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        DatabaseService
    ],
    exports: [DatabaseService]
})
export class CommonModule {}
