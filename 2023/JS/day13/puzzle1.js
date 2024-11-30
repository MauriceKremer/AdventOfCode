// const data = 
//     '#.##..##.\n'+
//     '..#.##.#.\n'+
//     '##......#\n'+
//     '##......#\n'+
//     '..#.##.#.\n'+
//     '..##..##.\n'+
//     '#.#.##.#.\n'+
//     '\n'+
//     '#...##..#\n'+
//     '#....#..#\n'+
//     '..##..###\n'+
//     '#####.##.\n'+
//     '#####.##.\n'+
//     '..##..###\n'+
//     '#....#..#';

const fs = require('node:fs');
const data = fs.readFileSync('input.txt', 'utf8');
//const data = raw.split(/\n/);

function horizontal(datastruct) {

    let columns = datastruct[0].split('').map((x,i)=>i).filter(f=>f!==0);
    let ready = false;
    for (let row = 0, rows = datastruct.length; row<rows; row++) {
        let data = datastruct[row];
        for (let x = 1, xs = data.length;x<xs;x++) {            
            let strt = Math.min(x,xs-x);
            let left  = data.substring(x-strt,x);
            let right = data.substring(x,x +left.length).split('').reverse().join('');
            if (left!==right) {
                columns = columns.filter(f=>f!==x);
            }

        }

        if (columns.length == data.length) break;

    }

    if (columns.length==1) return columns[0];
    return 0;

}

function transpose(datastruct) {
    let result = [];
    for (let x = 0 , xe = datastruct[0].length;x<xe;x++){
        let line = '';
        for (let row =0; row<datastruct.length; row++){
            line += datastruct[row][x];
        }
        result.push(line);
    }
    return result;
}


const structs = data.split('\n\n');
let sum = 0;
for (let i=0;i<structs.length;i++) {
    const block = structs[i].split('\n');
    let s = horizontal(block);
    if (s == 0) {
        s = horizontal(transpose(block));
        sum += s * 100;
    } else {
        sum += s;
    }

    console.log(s);
}
console.log(sum);