// sample 1
// const route = 'RL';
// const nodes = [
// 'AAA = (BBB, CCC)',
// 'BBB = (DDD, EEE)',
// 'CCC = (ZZZ, GGG)',
// 'DDD = (DDD, DDD)',
// 'EEE = (EEE, EEE)',
// 'GGG = (GGG, GGG)',
// 'ZZZ = (ZZZ, ZZZ)'];

// sample 2
// const route = 'LLR';
// const nodes = [
// 'AAA = (BBB, BBB)',
// 'BBB = (AAA, ZZZ)',
// 'ZZZ = (ZZZ, ZZZ)'];

// input
const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n\n/);
const route = data[0];
const nodes = data[1].split(/\n/);

const n = {};
for (let node of nodes) {
    n[node.substring(0,3)] = [node.substring(7,10), node.substring(12,15)];
}

console.log(n);

let d = [];
let position = 'AAA';
let found = false;
let i = 0;
while (!found) {
    if (d.length == 0) d = route.split('');
    let s = (d.shift()=='L')?0:1;
    i++;
    position = n[position][s];
    if (position=='ZZZ') found = true;
}

console.log(i);