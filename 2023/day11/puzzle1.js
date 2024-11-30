// const data = [
//     '...#......',
//     '.......#..',
//     '#.........',
//     '..........',
//     '......#...',
//     '.#........',
//     '.........#',
//     '..........',
//     '.......#..',
//     '#...#.....'
// ];

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

let emptyColumns = data[0].split('').map((x,i)=>i);
let emptyRows = [];

// empty columns
data.forEach(x=>x.split('').forEach((y,i)=> {if (y=='#') emptyColumns = emptyColumns.filter(z => z!==i); }));

// empty rows
data.forEach((x,i)=>{if (x.split('').filter(z=>z!=='.').length==0) emptyRows.push(i);});

// add empty rows
let expanded = [];
data.forEach((x,i) => {expanded.push(x); if (emptyRows.includes(i)) expanded.push(x); });
// add empty columns
expanded = expanded.map(x=>x.split('').map((y,i)=> emptyColumns.includes(i)?'..':y).join(''));

// get galaxy coordinates
let galaxy = [];
expanded.forEach((a,y)=>a.split('').forEach((b,x)=> {
    if (b=='#') galaxy.push([y,x]);
}));

let accumulated = 0;
galaxy.forEach((a,i)=>{
    for (let k = i+1, l = galaxy.length; k<l ; k++) {
        let yDistance = Math.max(a[0],galaxy[k][0]) - Math.min(a[0],galaxy[k][0]);
        let xDistance = Math.max(a[1],galaxy[k][1]) - Math.min(a[1],galaxy[k][1]);
        accumulated += yDistance + xDistance;
    }
})

// console.log(emptyColumns);
// console.log(emptyRows);
// console.log(expanded.join('\n'));
// console.log(galaxy);
console.log(accumulated);
