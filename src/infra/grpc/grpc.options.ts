import { PROTO_PATHS } from '@choncinema/contracts'
import { GrpcOptions } from '@nestjs/microservices'

export const grpcPackages = ['users.v1']

export const grpcProtoPaths = [PROTO_PATHS.USERS]

export const grpcLoader: NonNullable<GrpcOptions['options']['loader']> = {
	keepCase: false,
	longs: String,
	enums: String,
	defaults: true,
	oneofs: true
}
