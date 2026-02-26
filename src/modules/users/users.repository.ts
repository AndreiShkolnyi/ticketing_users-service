import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entities/user.entity'

@Injectable()
export class UsersRepository {
	public constructor(
		@InjectRepository(UserEntity)
		private readonly repository: Repository<UserEntity>
	) {}

	public findById(id: string) {
		return this.repository.findOneBy({
			id
		})
	}

	public create(data: Partial<UserEntity>) {
		const newUser = this.repository.create(data)
		return this.repository.save(newUser)
	}

	public update(id: string, data: Partial<UserEntity>) {
		this.repository.update(
			{
				id
			},
			data
		)

		return this.findById(id)
	}
}
