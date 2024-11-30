// const data = 
// 'O....#....\n'+
// 'O.OO#....#\n'+
// '.....##...\n'+
// 'OO.#O....O\n'+
// '.O.....O#.\n'+
// 'O.#..O.#.#\n'+
// '..O..#O..O\n'+
// '.......O..\n'+
// '#....###..\n'+
// '#OO..#....';

// lines = data.split('\n');

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const lines = raw.split(/\n/);

function replaceAt(line, index, replacement) {
    return line.substring(0, index) + replacement + line.substring(index + 1);
}


let stopPositions = {};
for (let row = 0 ; row < lines.length ; row++) {
    let line = lines[row];
    line.split('').forEach((v,i)=>{
        if (v=='O') {
            // remove from current position
            lines[row] = replaceAt(lines[row],i,'.');

            // // move into stop position
            let stopPosition = stopPositions.hasOwnProperty(i)?stopPositions[i]:0;
            lines[stopPosition] = replaceAt(lines[stopPosition],i,'O');

            stopPositions[i] = stopPosition + 1;
        } else if (v=='#') {
            stopPositions[i] = row+1;
        }
    });
}
console.log('moved north');
console.log(lines.join('\n'));

let southLines = 0;
let totalWeight = 0;
for (let i = lines.length -1 ; i >=0 ; i--) {
    southLines += 1;
    let lineWeight = 0;
    let line = lines[i];
    line.split('').forEach((v,i)=>{
        if (v=='O') {
            lineWeight += southLines;
        }
    });
    totalWeight += lineWeight;
    
}

console.log(totalWeight);