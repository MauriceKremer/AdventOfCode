const fs = require('fs');
const readline = require('readline');

const samples1 = [
    {'input':'467..114..','expect':[467,114]},
    {'input':'...*......','expect':[]},
    {'input':'..35..633.','expect':[35,633]},
    {'input':'......#...','expect':[]},
    {'input':'617*......','expect':[617]},
    {'input':'.....+.58.','expect':[58]},
    {'input':'..592.....','expect':[592]},
    {'input': '......755.','expect':[755]},
    {'input':'...$.*....','expect':[]},
    {'input':'.664.598..','expect':[664,598]},
];

function verify1() {

    console.log("\x1b[33m" + '-= The check thing =-'+ '\x1b[0m');
    let verified = true;
    for (let index in samples1) {
        const sample = samples1[index];
        const result = findNumberDetails(sample.input);

        let numberCheck = result.reduce(
            function(merged,item) {return [merged,item.number].join(',')},''
        );
        let numberExpect = sample.expect.reduce(
            function(merged,item) {return [merged,item].join(',')},''
        );

        const response = 'On Input ' + sample.input + ' got ' + numberCheck;
        if (numberCheck!=numberExpect) {
            console.log("\x1b[41m" + response +' but expected ' + numberExpect+ '\x1b[0m');
            verified = false;
        } else console.log("\x1b[32m"+ response + '\x1b[0m');
    }

    return verified;
}

const samples2 = [
    {'input':['.',
             '467..114..',
             '...*......',
             '..35..633.',
             '......#...',
             '617*......',
             '.....+.58.',
             '..592.....',
             '......755.',
             '...$.*....',
             '.664.598..',
             '.'],'expect':4361},
];

function verify2() {

    console.log("\x1b[33m" + '-= The check thing =-'+ '\x1b[0m');
    let verified = true;
    for (let index in samples2) {
        const sample = samples2[index];
        let numbers = [];
        for (let j in sample.input) {
            let line = sample.input[j];
            let lineResult = parseLine(line);
            numbers = [...numbers,...lineResult];
        }
        let numberGot = numbers.reduce((sum,item) => sum + item,0);

        const response = 'On Input got ' + numberGot;
        if (numberGot!=sample.expect) {
            console.log("\x1b[41m" + response +' but expected ' + sample.expect + '\x1b[0m');
            verified = false;
        } else console.log("\x1b[32m"+ response + '\x1b[0m');
    }

    return verified;
}

let lineMemory = [];

function parseLine(line){
    lineMemory.push(line);
    if (lineMemory.length == 4) lineMemory.shift();
    if (lineMemory.length < 2) return [];

    const numdetails = findNumberDetails(lineMemory[lineMemory.length-2]);
    let validnums = checkLines(lineMemory,numdetails);
    return validnums;
}

function checkLines (lines,results) {
    let numbers = [];
    for (let i in results) {
        let result = results[i];
        for (let j in lines) {
            let line = lines[j];
            if (checkSpecial(line,result.start, result.end)) {
                numbers.push(result.number);
            }
        }
    }
    return numbers;
}
 
function checkSpecial (line, start, end) {

    let searchFrom = (start==0)?0:start-1;
    let searchEnd  = (end>=line.length-1)?line.length-1:end+1;

    for (let index = searchFrom; index <= searchEnd; index ++) {
        let char = line[index];
        if (isNaN(parseInt(char)) && char != '.') {
            return true;
        }
    }
    return false;

}

function findNumberDetails (line) {

    let number = '';
    let start;
    let end;

    const results =  [];

    // terminated each line with . to finish
    line += '.';

    for (let index in line) {
        let char = line[index];

        if (!isNaN(parseInt(char))) {
            // found a number
            number = [number,char].join('');
            // was this the start of a number, then capture start index
            if (start == undefined) start = index;
        } else {
            if (start!=undefined) {
                end = index-1;
                results.push({
                    'number':parseInt(number),
                    'start':start,
                    'end':end
                });
                start = undefined; 
                end = undefined; 
                number = '';
            }
        }

    }
    return results;

}

async function onFile() {

        const rl = readline.createInterface({
          input: fs.createReadStream('input1.txt'),
          crlfDelay: Infinity,
        });
      
        sum = 0;
        rl.on('line', (line) => {
            let numbers = parseLine(line);
            sum += numbers.reduce((sum,item) => sum + item,0);
        });
      
        await new Promise((res) => rl.once('close', res));
        console.log(sum);
    
} 

void (async () => {
    if (verify1()&&verify2()) {
        console.log("\x1b[33m" + '-= The real thing =-'+ '\x1b[0m');
        lineMemory = [];
        await onFile();
    }
})();