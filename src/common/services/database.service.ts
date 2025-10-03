import {
    Injectable,
    Logger,
    OnModuleDestroy,
    OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from '../../../generated/prisma/client'

@Injectable()
export class DatabaseService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    private readonly logger = new Logger(DatabaseService.name)

    async onModuleInit() {
        try {
            await this.$connect()
            this.logger.log('✅ Database connected successfully')
        } catch (error) {
            this.logger.error('❌ Failed to connect to database', error)
            throw error
        }
    }

    async onModuleDestroy() {
        try {
            await this.$disconnect()
            this.logger.log('🔌 Database disconnected successfully')
        } catch (error) {
            this.logger.error(
                '⚠️ Error while disconnecting from database',
                error
            )
        }
    }
}
