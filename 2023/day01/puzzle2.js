const fs = require('fs');
const readline = require('readline');

const samples = [
    {'input':'two1nine','expect':29},
    {'input':'eightwothree','expect':83},
    {'input':'abcone2threexyz','expect':13},
    {'input':'xtwone3four','expect':24},
    {'input':'4nineeightseven2','expect':42},
    {'input':'zoneight234','expect':14},
    {'input':'7pqrstsixteen','expect':76},
    {'input':'sevenine','expect':79}, // extra sample for reused characters
    {'input':'oneight','expect':18}   // extra sample for reused characters
];

function verify() {

    console.log("\x1b[33m" + '-= The check thing =-'+ '\x1b[0m');
    let verified = true;
    for (let index in samples) {
        const sample = samples[index];
        const result = lineProcessor(sample.input);
        const response = 'On Input ' + sample.input + ' got ' + result;
        if (result!=sample.expect) {
            console.log("\x1b[41m" + response +' but expected ' + sample.expect+ '\x1b[0m');
            verified = false;
        } else console.log("\x1b[32m"+ response + '\x1b[0m');
    }

    return verified;
}

function checkLastForNumber( line , findtext , replacetext) {
    let result = '';
    if (line.length >= findtext.length && line.substr(-findtext.length) == findtext) {
        result = replacetext;
    }
    return result;
}

function lineBuilder (line) {

    let result = '';
    let originalline = '';

    for (let char in line) {
        char = line[char];

        originalline += char;
                
        if (!isNaN(parseInt(Number(char)))) {
            result += [result,char].join('');
        }
        
        result += checkLastForNumber(originalline,'one',1);
        result += checkLastForNumber(originalline,'two',2);
        result += checkLastForNumber(originalline,'three',3);
        result += checkLastForNumber(originalline,'four',4);
        result += checkLastForNumber(originalline,'five',5);
        result += checkLastForNumber(originalline,'six',6);
        result += checkLastForNumber(originalline,'seven',7);
        result += checkLastForNumber(originalline,'eight',8);
        result += checkLastForNumber(originalline,'nine',9);

    }
    return result;

}

function lineProcessor(original) {
    let first, last;
    let line = lineBuilder(original);
    first = line.substr(0,1);
    last = line.substr(-1);
    return parseInt(Number([first, last].join('')));
}

async function onFile() {

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt'),
        crlfDelay: Infinity,
    });

    sum = 0;
    rl.on('line', (line) => {
        sum += lineProcessor(line);
    });

    await new Promise((res) => rl.once('close', res));
    console.log(sum);

} 

void (async () => {
    if (verify()) {
        console.log("\x1b[33m" + '-= The real thing =-'+ '\x1b[0m');
        await onFile();
    }
})();