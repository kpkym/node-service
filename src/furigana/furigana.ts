import {IFuriganaServiceServer} from '../../gen/furigana/v1/request_grpc_pb';
import * as grpc from '@grpc/grpc-js';
import {sendUnaryData, UntypedHandleCall} from '@grpc/grpc-js';
import {FuriganaServiceConvertRequest, FuriganaServiceConvertResponse} from '../../gen/furigana/v1/request_pb';
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";

let kuroshiro = null;


export class FuriganaServiceServer implements IFuriganaServiceServer {
    async convert(call: grpc.ServerUnaryCall<FuriganaServiceConvertRequest, FuriganaServiceConvertResponse>, callback: sendUnaryData<FuriganaServiceConvertResponse>): Promise<void> {
        global.logger.info(`${new Date().toISOString()}    request: ${call.request}`);
        const furiganaServiceConvertResponse = new FuriganaServiceConvertResponse();
        furiganaServiceConvertResponse.setBody(await parse(call.request));
        callback(null, furiganaServiceConvertResponse);
    }

    [name: string]: UntypedHandleCall;
}

async function parse(request: FuriganaServiceConvertRequest): Promise<string> {

    if (kuroshiro == null) {
        global.logger.info("init kuroshiro");
        kuroshiro = new Kuroshiro()
        await kuroshiro.init(new KuromojiAnalyzer());
    }
    let resp = await kuroshiro.convert(request.getBody(), {mode: request.getMode(), to: request.getTo()});
    global.logger.info(`parse result: ${resp}`)
    return resp;
}

export const exportedForTesting = {
    parse
}
