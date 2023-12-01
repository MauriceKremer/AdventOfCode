const fs = require('fs');
const readline = require('readline');

const samples = [
    {'input':'1abc2','expect':12},
    {'input':'pqr3stu8vwx','expect':38},
    {'input':'a1b2c3d4e5f','expect':15},
    {'input':'treb7uchet','expect':77},
];

function verify() {

    console.log("\x1b[33m" + '-= The check thing =-'+ '\x1b[0m');
    let verified = true;
    for (let index in samples) {
        const sample = samples[index];
        const result = getNumber(sample.input);
        const response = 'On Input ' + sample.input + ' got ' + result;
        if (result!=sample.expect) {
            console.log("\x1b[41m" + response +' but expected ' + sample.expect+ '\x1b[0m');
            verified = false;
        } else console.log("\x1b[32m"+ response + '\x1b[0m');
    }

    return verified;
}

function getNumber (line) {
    let first, last;
        // read chars on the line
        for (let index in line) {
            char = line[index];

            // check if the char is a number
            if (!isNaN(parseInt(Number(char)))) {
                // if the first number is not set, then take this char as the first number
                if (first == undefined) first = parseInt(Number(char));
                else {
                    //keep assigning the the newly found number as the last number
                    last = parseInt(Number(char));
                }
            }
        }
        if (last == undefined) last = first;

        return parseInt(Number([first, last].join('')));
}

async function onFile() {

        const rl = readline.createInterface({
          input: fs.createReadStream('input.txt'),
          crlfDelay: Infinity,
        });
      
        sum = 0;
        rl.on('line', (line) => {
            sum += getNumber(line);
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