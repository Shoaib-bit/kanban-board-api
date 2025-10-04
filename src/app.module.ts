import { Module } from '@nestjs/common'
import { AuthModule } from './auth'
import { CommonModule } from './common'
import { TasksModule } from './tasks'

@Module({
    imports: [CommonModule, AuthModule, TasksModule],
    controllers: [],
    providers: []
})
export class AppModule {}
