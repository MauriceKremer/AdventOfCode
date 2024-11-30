const fs = require('fs');
const readline = require('readline');

const samples = [
    {'input':'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green','expect':48},
    {'input':'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue','expect':12},
    {'input':'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red','expect':1560},
    {'input':'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red','expect':630},
    {'input':'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green','expect':36},
];

function verify() {

    console.log("\x1b[33m" + '-= The check thing =-'+ '\x1b[0m');
    let verified = true;
    for (let index in samples) {
        const sample = samples[index];
        const result = parseLine(sample.input);
        const response = 'On Input ' + sample.input + ' got ' + result;
        if (result!=sample.expect) {
            console.log("\x1b[41m" + response +' but expected ' + sample.expect+ '\x1b[0m');
            verified = false;
        } else console.log("\x1b[32m"+ response + '\x1b[0m');
    }

    return verified;
}

function parseLine(line){
    
    const result = {};
    const parts = line.split(':');
    result.red = 0;
    result.blue = 0;
    result.green = 0;

    const games = parts[1].split(';');
    for (let index in games) {
        const game = games[index];
        const cubeSets = game.split(',');
        for (let cIndex in cubeSets) {
            const cubeSet = cubeSets[cIndex].trim();
            const color = cubeSet.split(' ')[1];
            const amount = parseInt(cubeSet.split(' ')[0]);

            if (amount > result[color]) result[color] = amount;
        }
    }
    return result.red * result.blue * result.green;

}

async function onFile() {

        const rl = readline.createInterface({
          input: fs.createReadStream('input1.txt'),
          crlfDelay: Infinity,
        });
      
        sum = 0;
        rl.on('line', (line) => {
            sum += parseLine(line);
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