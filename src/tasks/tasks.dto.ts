import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Status } from 'generated/prisma'

export class CreateTaskDto {
    @ApiProperty({ example: 'Finish NestJS project' })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ example: 'Complete CRUD APIs for tasks', required: false })
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({ enum: Status, example: Status.todo, required: false })
    @IsOptional()
    @IsEnum(Status)
    status?: Status
}

export class UpdateTaskDto {
    @ApiPropertyOptional({ example: 'Updated task title' })
    @IsOptional()
    @IsString()
    title?: string

    @ApiPropertyOptional({ example: 'Updated task description' })
    @IsOptional()
    @IsString()
    description?: string

    @ApiPropertyOptional({ enum: Status, example: Status.in_progress })
    @IsOptional()
    @IsEnum(Status)
    status?: Status
}
