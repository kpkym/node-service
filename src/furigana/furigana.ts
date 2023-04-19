import {IFuriganaServiceServer} from 'gen/furigana/v1/request_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import {sendUnaryData, UntypedHandleCall} from '@grpc/grpc-js';
import {FuriganaServiceConvertRequest, FuriganaServiceConvertResponse} from '../../gen/furigana/v1/request_pb';

export class FuriganaServiceServer implements IFuriganaServiceServer {
    convert(call: grpc.ServerUnaryCall<FuriganaServiceConvertRequest, FuriganaServiceConvertResponse>, callback: sendUnaryData<FuriganaServiceConvertResponse>): void {
        console.log(`${new Date().toISOString()}    request ${call.request.getBody()}`);
        const furiganaServiceConvertResponse = new FuriganaServiceConvertResponse();
        furiganaServiceConvertResponse.setBody(`hello: ${call.request.getBody()}`);
        callback(null, furiganaServiceConvertResponse);
    }

    [name: string]: UntypedHandleCall;
}
