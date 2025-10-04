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
    async updateTask(
        @Req() req,
        @Param('id') id: string,
        @Body() dto: UpdateTaskDto
    ) {
        try {
            //Todo
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
    async deleteTask(@Req() req, @Param('id') id: string) {
        try {
            //Todo
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
