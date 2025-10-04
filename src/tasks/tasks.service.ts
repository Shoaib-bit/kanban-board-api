import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/common/services'
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto'

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

    async updateTask(id: number, updateTaskDto: UpdateTaskDto) {
        try {
            const updatedTask = await this.databaseService.task.update({
                where: { id },
                data: updateTaskDto,
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
            return updatedTask
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Task not found')
            }
            throw new Error(`Failed to update task: ${error.message}`)
        }
    }

    async deleteTask(id: number) {
        try {
            const taskDelete = await this.databaseService.task.delete({
                where: { id }
            })
            return taskDelete
        } catch (error) {
            if (error.code === 'P2025') {
                throw new Error('Task not found')
            }
            throw new Error(`Failed to delete task: ${error.message}`)
        }
    }
}
