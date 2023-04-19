import {IFuriganaServiceServer} from 'gen/furigana/v1/request_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import {sendUnaryData, UntypedHandleCall} from '@grpc/grpc-js';
import {FuriganaServiceConvertRequest, FuriganaServiceConvertResponse} from '../../gen/furigana/v1/request_pb';
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";


export class FuriganaServiceServer implements IFuriganaServiceServer {
    async convert(call: grpc.ServerUnaryCall<FuriganaServiceConvertRequest, FuriganaServiceConvertResponse>, callback: sendUnaryData<FuriganaServiceConvertResponse>): Promise<void> {
        console.log(`${new Date().toISOString()}    request ${call.request.getBody()}`);

        const kuroshiro = new Kuroshiro();
        // Initialize
        // Here uses async/await, you could also use Promise
        await kuroshiro.init(new KuromojiAnalyzer());
        // Convert what you want
        const result = await kuroshiro.convert(call.request.getBody(), {mode: "furigana", to: "hiragana"});

        const furiganaServiceConvertResponse = new FuriganaServiceConvertResponse();
        furiganaServiceConvertResponse.setBody(`hello: ${result}`);
        callback(null, furiganaServiceConvertResponse);
    }

    [name: string]: UntypedHandleCall;
}
