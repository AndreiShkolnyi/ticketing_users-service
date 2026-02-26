import type {
	AccountServiceClient,
	GetAccountRequest
} from '@choncinema/contracts/gen/ts/account'
import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import type { ClientGrpc } from '@nestjs/microservices'

@Injectable()
export class AccountClientGrpc implements OnModuleInit {
	private accountsService: AccountServiceClient

	constructor(
		@Inject('ACCOUNT_MODULE') private readonly client: ClientGrpc
	) {}

	onModuleInit() {
		this.accountsService =
			this.client.getService<AccountServiceClient>('AccountService')
	}

	public getAccount(request: GetAccountRequest) {
		return this.accountsService.getAccount(request)
	}
}
