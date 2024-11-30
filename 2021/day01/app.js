const fs = require('fs');
//const data = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

let count = 0;
let previous;
let rows = data.split(/\r?\n/);
for (let i = 0; i < rows.length-2; i++) {
    const row = rows[i];

    let first = parseInt(row);
    let second = parseInt(rows[i+1]);
    let third = parseInt(rows[i+2]);
    let value = first+second+third;

    if (previous && previous < value) count++;
    previous = value;
    console.log(i,count);
};
console.log(count);