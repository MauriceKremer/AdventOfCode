
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
let lines = raw.split(/\n/);

function replaceAt(line, index, replacement) {
    return line.substring(0, index) + replacement + line.substring(index + 1);
}

function north(inputLines) {
    let stopPositions = {};
    for (let row = 0 ; row < inputLines.length ; row++) {
        let line = inputLines[row];
        line.split('').forEach((v,i)=>{
            if (v=='O') {
                // remove from current position
                inputLines[row] = replaceAt(inputLines[row],i,'.');

                // // move into stop position
                let stopPosition = stopPositions.hasOwnProperty(i)?stopPositions[i]:0;
                inputLines[stopPosition] = replaceAt(inputLines[stopPosition],i,'O');

                stopPositions[i] = stopPosition + 1;
            } else if (v=='#') {
                stopPositions[i] = row+1;
            }
        });
    }
    return inputLines;
}


const rotate = (source) => {
    result = [];
    for (let column = 0, columns = source[0].length; column < columns; column++){
        result.push([]);
        let cnt=0;
        for (let row = source.length - 1; row >= 0; row--){
            result[column][row] = source[cnt][column];
            cnt++;
        }
    }
    return result.map(v=>v.join(''));
}

// make the moves

let shapes = [];

function getKey(x) {
    return x.join('');
}

const weigths = (lines) => {
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
    /// 105008
    return totalWeight;
}

let known = false;
for (let i = 0, j = 1000000000; i < j; i++) {
    let key;
    if (!known) {
        key = getKey(lines);
        if (shapes.indexOf(key)>-1) {
            known = true;

            let gapBetween = i - shapes.indexOf(key);
            let remainingSteps = j-i;
            let iterationsToGo = remainingSteps%gapBetween;

            console.log('after ', i, ' passes back at ', shapes.indexOf(key));
            console.log('gapBetween',gapBetween);
            console.log('remaining steps', (j-i));
            console.log(iterationsToGo,'steps reduced');

            i = j-iterationsToGo;
        } 
    }

    for (let j = 1; j <= 4; j++) { 
        lines = north(lines);
        lines = rotate(lines);
    }
    if (!known) shapes.push(key);
    
    console.log(j-i, (known?weigths(lines):'false'));
}

