const fs = require('fs');
//const data = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

let horizontal = 0;
let depth = 0;
let aim = 0;


let rows = data.split(/\r?\n/);
for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    let command = row.split(/\s/);
    if (command[0]==='forward') {
        horizontal += parseInt(command[1]);
        depth += parseInt(command[1]) * aim;
    }
    if (command[0]==='up') {
        //depth -= parseInt(command[1]);
        aim -= parseInt(command[1]);
    }
    if (command[0]==='down') {
        //depth += parseInt(command[1]);
        aim += parseInt(command[1]);
    }
    console.log(row,horizontal,depth,aim);
}

console.log(horizontal * depth);