import {expect, test} from '@jest/globals';
import {parse} from './furigana'


test('check', async () => {
    let input = "感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！";

    let output = await parse(input);
    console.log(output)
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
