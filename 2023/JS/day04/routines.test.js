const { prizeCheck , getNumbers , countMatches , score, cardIdNumber, updateMultipliers, prizeCheck2, reset} = require('./routines.js');

describe("prizeCheck", () => {

    test("", () => {
        let priceLine = 'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53';
        expect(prizeCheck(priceLine)).toBe(8);
    });

    test("get the number in an array from a text", () => {
        let priceLine = ' 41 48 83 86 17 ';
        expect(getNumbers(priceLine).length).toBe(5);
        expect(getNumbers(priceLine)).toContain(41);
        expect(getNumbers(priceLine)).toContain(48);
        expect(getNumbers(priceLine)).toContain(83);
        expect(getNumbers(priceLine)).toContain(86);
        expect(getNumbers(priceLine)).toContain(17);
    });

    test("test number of matches", () => {
        let first = [41,48,83,86,17];
        let second = [83,86,6,31,17,9,48,53];
        expect(countMatches(first,second)).toBe(4);
    });

    test("score", () => {
        expect(score(0)).toBe(0);
        expect(score(1)).toBe(1);
        expect(score(2)).toBe(2);
        expect(score(3)).toBe(4);
        expect(score(4)).toBe(8);
    });
    
    test("cardIdNumber", () => {
        expect(cardIdNumber('Card   1')).toBe(1);
        expect(cardIdNumber('Card  20')).toBe(20);
        expect(cardIdNumber('Card 200')).toBe(200);
    });
    
    test("updateMultipliers", () => {
        reset();
        expect(updateMultipliers('Card   1',4)).toBe(1);
        expect(updateMultipliers('Card   2',2)).toBe(2);
        expect(updateMultipliers('Card   3',2)).toBe(4);
        expect(updateMultipliers('Card   4',1)).toBe(8);
        expect(updateMultipliers('Card   5',0)).toBe(14);
        expect(updateMultipliers('Card   6',0)).toBe(1);
    });
    
    test("prizeCheck2", () => {
        reset();
        prizeCheck2('Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53');
        prizeCheck2('Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19');
        prizeCheck2('Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1');
        prizeCheck2('Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83');
        prizeCheck2('Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36');
        let sum = prizeCheck2('Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11');
        
        expect(sum).toBe(30);
    });


});