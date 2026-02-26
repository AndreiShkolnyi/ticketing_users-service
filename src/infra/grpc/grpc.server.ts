/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { type MicroserviceOptions, Transport } from '@nestjs/microservices'

import { grpcLoader, grpcPackages, grpcProtoPaths } from './grpc.options'

export function createGrpcServer(app: INestApplication, config: ConfigService) {
	const host = config.getOrThrow('GRPC_HOST')
	const port = config.getOrThrow('GRPC_PORT')

	app.connectMicroservice<MicroserviceOptions>({
		transport: Transport.GRPC,
		options: {
			package: grpcPackages,
			protoPath: grpcProtoPaths,
			url: `${host}:${port}`,
			loader: grpcLoader
		}
	})
}
