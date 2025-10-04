import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/common/services'
import { CreateTaskDto } from './tasks.dto'

@Injectable()
export class TasksService {
    constructor(private readonly databaseService: DatabaseService) {}

    async getAllTasks() {
        try {
            const tasks = await this.databaseService.task.findMany({
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            })
            return tasks
        } catch (error) {
            throw new Error(`Failed to get tasks: ${error.message}`)
        }
    }

    async addTask(userId: number, taskDto: CreateTaskDto) {
        try {
            const newTask = await this.databaseService.task.create({
                data: {
                    ...taskDto,
                    userId
                }
            })
            return newTask
        } catch (error) {
            throw new Error(`Failed to create task: ${error.message}`)
        }
    }
}
