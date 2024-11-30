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
// const jumpSize = 100;

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);
const jumpSize = 1000000;

let emptyColumns = data[0].split('').map((x,i)=>i);
let emptyRows = [];

// empty columns
data.forEach(x=>x.split('').forEach((y,i)=> {if (y=='#') emptyColumns = emptyColumns.filter(z => z!==i); }));

// empty rows
data.forEach((x,i)=>{if (x.split('').filter(z=>z!=='.').length==0) emptyRows.push(i);});

// get galaxy coordinates
let galaxy = [];
data.forEach((a,y)=>a.split('').forEach((b,x)=> {
    if (b=='#') galaxy.push([y,x]);
}));

let accumulated = 0;
galaxy.forEach((a,i)=>{
    for (let k = i+1, l = galaxy.length; k<l ; k++) {
        
        let minY = Math.min(a[0],galaxy[k][0]);
        let minX = Math.min(a[1],galaxy[k][1]);
        let maxY = Math.max(a[0],galaxy[k][0]);
        let maxX = Math.max(a[1],galaxy[k][1]);

        let Xjumps = emptyColumns.filter(i=> i>minX && i<maxX).length;
        let Yjumps = emptyRows.filter(i=> i>minY && i<maxY).length;

        let xDistance = maxX - minX - Xjumps + (Xjumps * jumpSize);
        let yDistance = maxY - minY - Yjumps + (Yjumps * jumpSize);

        accumulated += yDistance + xDistance;
    }
})

console.log(accumulated);



