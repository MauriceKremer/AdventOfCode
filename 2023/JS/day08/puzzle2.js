// sample 1
// const route = 'LR';
// const nodes = [
// '11A = (11B, XXX)',
// '11B = (XXX, 11Z)',
// '11Z = (11B, XXX)',
// '22A = (22B, XXX)',
// '22B = (22C, 22C)',
// '22C = (22Z, 22Z)',
// '22Z = (22B, 22B)',
// 'XXX = (XXX, XXX)'];

//input
const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n\n/);
const route = data[0];
const nodes = data[1].split(/\n/);

const n = {};
for (let node of nodes) {
    n[node.substring(0,3)] = [node.substring(7,10), node.substring(12,15)];
}

let positions = nodes.map((c)=>c.substring(0,3)).filter((s,i,a)=> s.substring(2,3) == 'A');
console.log('start',positions);

let d = [];
let found = false;
let i = 0;            
while (!found && i < 10000000000000) {
    if (d.length == 0) d = route.split('');
    let s = (d.shift()=='L')?0:1;
    i++;
    positions = positions.map((p,i)=>n[p][s]);
    found = positions.filter((a)=>a.substring(2,3) == 'Z').length == positions.length;
}

console.log(i);