import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Patch,
    Post,
    Req,
    UseGuards
} from '@nestjs/common'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from 'src/common/guards'
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto'
import { TasksService } from './tasks.service'

@UseGuards(AuthGuard)
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}
    @Get()
    async getTasks() {
        try {
            const tasks = await this.tasksService.getAllTasks()

            return {
                success: true,
                message: 'Get Tasks Successfully',
                data: tasks
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

    @Post()
    async createTask(@Req() req, @Body() dto: CreateTaskDto) {
        try {
            const task = await this.tasksService.addTask(req.user.id, dto)
            return {
                success: true,
                message: 'Task Created Successfully',
                data: task
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

    @Patch(':id')
    async updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
        try {
            const updatedTask = await this.tasksService.updateTask(
                Number(id),
                dto
            )

            return {
                success: true,
                message: 'Task Updated Successfully',
                data: updatedTask
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

    @Delete(':id')
    async deleteTask(@Param('id') id: number) {
        try {
            await this.tasksService.deleteTask(Number(id))

            return {
                message: 'Task Delete Successfully',
                success: true,
                data: null
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
