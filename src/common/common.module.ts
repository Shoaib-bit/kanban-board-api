import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { HttpExceptionFilter } from './filters'
import { DatabaseService } from './services'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
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
