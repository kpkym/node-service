import {IFuriganaServiceServer} from '../../gen/furigana/v1/request_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import {sendUnaryData, UntypedHandleCall} from '@grpc/grpc-js';
import {FuriganaServiceConvertRequest, FuriganaServiceConvertResponse} from '../../gen/furigana/v1/request_pb';
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import Log from "../../config/logging";

let kuroshiro = null;


export class FuriganaServiceServer implements IFuriganaServiceServer {
    async convert(call: grpc.ServerUnaryCall<FuriganaServiceConvertRequest, FuriganaServiceConvertResponse>, callback: sendUnaryData<FuriganaServiceConvertResponse>): Promise<void> {
        Log.info(`${new Date().toISOString()}    request: ${call.request}`);
        Log.info(`${new Date().toISOString()}    request: ${call.request.getTo()}`);

        const furiganaServiceConvertResponse = new FuriganaServiceConvertResponse();
        let body = call.request.getBody();
        furiganaServiceConvertResponse.setBody(`hello: ${body}`);
        callback(null, furiganaServiceConvertResponse);
    }

    [name: string]: UntypedHandleCall;
}

async function parse(body: string): Promise<string> {

    if (kuroshiro == null) {
        Log.info("init kuroshiro");
        // Initialize
        kuroshiro = new Kuroshiro()
        // Here uses async/await, you could also use Promise
        await kuroshiro.init(new KuromojiAnalyzer());
    }
    // Convert what you want
    return await kuroshiro.convert(body, {mode: "furigana", to: "hiragana"});
}


export const exportedForTesting = {
    parse
}
