const {mapResources,getLoadResult,readmaptype,parseLine,readSeeds} = require('./routines5.js');

describe("prizeCheck", () => {
    test("build Mapping", () => {
        mapResources('seed','soil',50,98,2);
        mapResources('seed','soil',52,50,48);
        
        let result = getLoadResult();
        expect(
            result['seed'][0]['target']
        ).toBe('soil');
    });

    test("readmaptype", () => {
        let result = readmaptype('seed-to-soil map:');
        expect(
            result['src']
        ).toBe('seed');
        expect(
            result['target']
        ).toBe('soil');
        
    });

    test("parseLine", () =>{
        parseLine('seeds: 79 14 55 13');
        parseLine('');
        parseLine('seed-to-soil map:');
        parseLine('50 98 2');
        parseLine('52 50 48');
        parseLine('');
        parseLine('soil-to-fertilizer map:');
        parseLine('0 15 37');
        parseLine('37 52 2');
        parseLine('39 0 15');
        parseLine('');
        parseLine('fertilizer-to-water map:');
        parseLine('49 53 8');
        parseLine('0 11 42');
        parseLine('42 0 7');
        parseLine('57 7 4');
        parseLine('');
        parseLine('water-to-light map:');
        parseLine('88 18 7');
        parseLine('18 25 70');
        parseLine('');
        parseLine('light-to-temperature map:');
        parseLine('45 77 23');
        parseLine('81 45 19');
        parseLine('68 64 13');
        parseLine('');
        parseLine('temperature-to-humidity map:');
        parseLine('0 69 1');
        parseLine('1 0 69');
        parseLine('');
        parseLine('humidity-to-location map:');
        parseLine('60 56 37');
        parseLine('56 93 4');

        let result = getLoadResult();

        expect(result.hasOwnProperty('temperature')).toBe(true);

        let results = readSeeds();

        expect(results[0]).toBe(82);
        expect(results[1]).toBe(43);
        expect(results[2]).toBe(86);
        expect(results[3]).toBe(35);

    });

});