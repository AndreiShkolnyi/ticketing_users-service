import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { UserEntity } from 'src/modules/users/entities/user.entity'

export const getTypeOrmConfig = (
	config: ConfigService
): TypeOrmModuleOptions => {
	return {
		type: 'postgres',
		host: config.getOrThrow('DATABASE_HOST'),
		port: config.getOrThrow('DATABASE_PORT'),
		username: config.getOrThrow('DATABASE_USERNAME'),
		password: config.getOrThrow('DATABASE_PASSWORD'),
		database: config.getOrThrow('DATABASE_NAME'),
		entities: [UserEntity],
		synchronize: config.getOrThrow('DATABASE_SYNC') === 'true',
		logging: config.getOrThrow('DATABASE_LOGGING') === 'true'
	}
}
