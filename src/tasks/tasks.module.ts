import { Module } from '@nestjs/common'
import { CommonModule } from 'src/common'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
    imports: [CommonModule],
    controllers: [TasksController],
    providers: [TasksService]
})
export class TasksModule {}
