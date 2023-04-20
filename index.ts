import './config/logging';
import * as grpc from '@grpc/grpc-js';
import {FuriganaServiceService} from "./gen/furigana/v1/request_grpc_pb";
import {FuriganaServiceServer} from "./src/furigana/furigana";

function serve(): void {

    const server = new grpc.Server();

    {
        server.addService(FuriganaServiceService, new FuriganaServiceServer());
    }

    server.bindAsync(`localhost:${process.env.PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            throw err;
        }
        global.logger.info(`Listening on ${port}`);
        global.logger.info(`Listening on ${port}`);
        server.start();
    });
}

serve()
