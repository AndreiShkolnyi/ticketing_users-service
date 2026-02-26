import { RpcStatus } from '@choncinema/common'
import type {
	CreateUserRequest,
	CreateUserResponse,
	GetMeRequest,
	GetMeResponse,
	PatchUserRequest,
	PatchUserResponse
} from '@choncinema/contracts/gen/ts/users'
import { Injectable } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
import { lastValueFrom } from 'rxjs'
import { AccountClientGrpc } from 'src/infra/grpc/clients/account.client'

import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
	public constructor(
		private readonly usersRepository: UsersRepository,
		private readonly accountClient: AccountClientGrpc
	) {}

	public async create(data: CreateUserRequest): Promise<CreateUserResponse> {
		await this.usersRepository.create(data)
		return { ok: true }
	}

	public async getMe(data: GetMeRequest): Promise<GetMeResponse> {
		const user = await this.usersRepository.findById(data.id)

		if (!user) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'User not found'
			})
		}

		const account = await lastValueFrom(
			this.accountClient.getAccount({ id: data.id })
		)

		return {
			user: {
				id: user.id,
				name: user.name ?? undefined,
				avatar: user.avatar ?? undefined,
				phone: account.phone,
				email: account.email
			}
		}
	}

	public async update(data: PatchUserRequest): Promise<PatchUserResponse> {
		const { userId, name, avatar } = data
		const user = await this.usersRepository.findById(userId)

		if (!user) {
			throw new RpcException({
				code: RpcStatus.NOT_FOUND,
				message: 'User not found'
			})
		}

		await this.usersRepository.update(userId, {
			...(name !== undefined && { name }),
			...(avatar !== undefined && { avatar })
		})

		return {
			ok: true
		}
	}
}
