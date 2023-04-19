import {expect, test} from '@jest/globals';
import {exportedForTesting} from './furigana'
import {FuriganaServiceConvertRequest} from "../../gen/furigana/v1/request_pb";


test('check', async () => {
    let input = "感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！";

    let furiganaServiceConvertRequest = new FuriganaServiceConvertRequest();
    furiganaServiceConvertRequest.setBody(input)
    furiganaServiceConvertRequest.setTo('hiragana')
    furiganaServiceConvertRequest.setMode('furigana')
    await exportedForTesting.parse(furiganaServiceConvertRequest);
});


test('demo', () => {
    // Arrange
    let x: number = 1, y: number = 2;
    let expected: number = 4;

    // Act
    let actual: number = x + y;

    // Assert
    expect(actual).toBe(expected);
});
