// const data =[
// '..F7.',
// '.FJ|.',
// 'SJ.L7',
// '|F--J',
// 'LJ...'
// ];

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

const grid = [];
let sy,sx;
for (let i = 0, j = data.length; i<j; i++){
    let xd = data[i].split('');

    if (sy == undefined) {
        let px = xd.indexOf('S');
        if (px>=0) {
            sy =i; sx=px;
        }
    } 
    grid.push(xd);
}

console.log(grid,sx,sy);

function nextPos (x,y, ignoreX,ignoreY) {

    let options = [];

    // y - 1
    if (['S','|','L','J'].includes(grid[y][x]) && y > 0 && !(y-1==ignoreY && x==ignoreX)) {
        if (['F','7','|'].includes(grid[y-1][x])) {
            options.push([x,y-1]);
        }
    }
        
    // y + 1
    if (['S','|','7','F'].includes(grid[y][x]) && y+1 < grid.length && !(y+1==ignoreY && x==ignoreX)) {
        if (['L','J','|'].includes(grid[y+1][x])) {
            options.push([x,y+1]);
        }
    }
       
    // x - 1
    if (['S','-','7','J'].includes(grid[y][x]) && x > 0 && !(y==ignoreY && x-1==ignoreX)) {
        if (['F','L','-'].includes(grid[y][x-1])) {
            options.push([x-1,y]); 
        }
    }
   
    // x + 1
    if (['S','-','F','L'].includes(grid[y][x]) && x < grid[0].length-1 && !(y==ignoreY && x-1==ignoreX+1)) {
        if (['7','J','-'].includes(grid[y][x+1])) {
            options.push([x+1,y]); 
        }
    }

    return options;
        
}

let step =1;
let p0 = [sx,sy];
let p1 = [sx,sy];
let n0 = nextPos(sx,sy,-1,-1)[0];
let n1 = nextPos(sx,sy,-1,-1)[1];
while (true) {
    step ++;
    console.log(n0,n1);
    const pn0 = n0;
    const pn1 = n1;
    n0 = nextPos(n0[0],n0[1],p0[0],p0[1])[0];
    n1 = nextPos(n1[0],n1[1],p1[0],p1[1])[0];
    if (n0[0]==n1[0] && n0[1]==n1[1]) break;
    p0=pn0;
    p1=pn1;
}

console.log(n0,n1,step);
