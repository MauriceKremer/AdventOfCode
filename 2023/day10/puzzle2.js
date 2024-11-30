// const data =[
// '...........',
// '.S-------7.',
// '.|F-----7|.',
// '.||....F||.',
// '.||.....||.',
// '.|L-7.F-J|.',
// '.|..|.|..|.',
// '.L--J.L--J.',
// '...........',
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

console.log('Start',sx,sy);
let possibleS = ['-','|','7','J','L','F'];

function log() {
    console.log('');
    for (let gr of grid){
        console.log(gr.join(''));
    }
} 

function nextPos (x,y, ignoreX,ignoreY, checkS) {

    let options = [];

    // y - 1
    if (['S','|','L','J'].includes(grid[y][x]) && y > 0 && !(y-1==ignoreY && x==ignoreX)) {
        if (['F','7','|'].includes(grid[y-1][x])) {
            if (checkS) possibleS = possibleS.filter(value => ['|','L','J'].includes(value));
            options.push([x,y-1]);
        }
    }
        
    // y + 1
    if (['S','|','7','F'].includes(grid[y][x]) && y+1 < grid.length && !(y+1==ignoreY && x==ignoreX)) {
        if (['L','J','|'].includes(grid[y+1][x])) {
            if (checkS) possibleS = possibleS.filter(value => ['|','7','F'].includes(value));
            options.push([x,y+1]);
        }
    }
       
    // x - 1
    if (['S','-','7','J'].includes(grid[y][x]) && x > 0 && !(y==ignoreY && x-1==ignoreX)) {
        if (['F','L','-'].includes(grid[y][x-1])) {
            if (checkS) possibleS = possibleS.filter(value => ['-','7','J'].includes(value));
            options.push([x-1,y]); 
        }
    }
   
    // x + 1
    if (['S','-','F','L'].includes(grid[y][x]) && x < grid[0].length-1 && !(y==ignoreY && x-1==ignoreX+1)) {
        if (['7','J','-'].includes(grid[y][x+1])) {
            if (checkS) possibleS = possibleS.filter(value => ['-','L','F'].includes(value));
            options.push([x+1,y]); 
        }
    }

    return options;
        
}

let step =1;
const ploop = [sx+'-'+sy];
let p0 = [sx,sy];
let p1 = [sx,sy];
let n0 = nextPos(sx,sy,-1,-1,true)[0];
ploop.push(n0[0]+'-'+n0[1]);
let n1 = nextPos(sx,sy,-1,-1,true)[1];
ploop.push(n1[0]+'-'+n1[1]);


// set correct value on S
grid[sy][sx] = possibleS[0];

while (true) {
    step ++;
    const pn0 = n0;
    const pn1 = n1;
    n0 = nextPos(n0[0],n0[1],p0[0],p0[1])[0];
    n1 = nextPos(n1[0],n1[1],p1[0],p1[1])[0];
    ploop.push(n0[0]+'-'+n0[1]);
    ploop.push(n1[0]+'-'+n1[1]);
    if (n0[0]==n1[0] && n0[1]==n1[1]) break;
    p0=pn0;
    p1=pn1;
}

//clean grid
for (let gr in grid) {
    for (let gk in grid[gr]) {
        if (!ploop.includes(gk+'-'+gr)) grid[gr][gk] = '.';
    }
}

function verticalCheck (sx,sy,ey) {
    let to = 0; 
    let riding;
    for (let y = sy; y <= ey; y++) {
        if (['-'].includes(grid[y][sx])) to++;
        if (riding == undefined && ['L','J','F','7'].includes(grid[y][sx])) riding = grid[y][sx];
        if (riding == 'L' && ['7'].includes(grid[y][sx])) {riding = undefined;to ++;}
        if (riding == '7' && ['L'].includes(grid[y][sx])) {riding = undefined;to ++;}
        if (riding == 'J' && ['F'].includes(grid[y][sx])) {riding = undefined;to ++;}
        if (riding == 'F' && ['J'].includes(grid[y][sx])) {riding = undefined;to ++;}
        if (riding!=undefined && !['|'].includes(grid[y][sx])) {riding = undefined;}
    }
    return to;
}

let ll=false;
function horizontalCheck (sx,ex,sy) {
    if (ll) {console.log('---',sx,ex,sy);}
    let to = 0; 
    let riding;
    for (let x = sx; x <= ex; x++) {
        if (['|'].includes(grid[sy][x])) to++;
        if (riding == undefined && ['L','F'].includes(grid[sy][x])) riding = grid[sy][x];
        if (riding == 'L' && ['7'].includes(grid[sy][x])) {riding = undefined;to ++;}
        if (riding == 'F' && ['J'].includes(grid[sy][x])) {riding = undefined;to ++;}
        if (riding!=undefined && !['-'].includes(grid[sy][x])) {riding = undefined;}

        if (ll) {console.log(grid[sy][x],to);}
    }
    return to;
}

let islands = 0;
for (let gr = 0, grl = grid.length; gr < grl; gr++) {
    for (let gk = 0, gkl = grid[gr].length; gk < gkl; gk++) {

        if (gr==120) {
            ll = (gr==120 && (gk+29)==gkl);
            console.log(gk, gkl,(gk+29)==gkl,ll);
        }
        
        if (grid[gr][gk] !='.') continue;

        let cop = 0; let cdown = 0; let cleft = 0;let cright = 0;
        cop    = verticalCheck  (gk,0,gr-1);
        cdown  = verticalCheck  (gk,gr+1,grl-1);
        cleft  = horizontalCheck(0,gk-1,gr);
        cright = horizontalCheck(gk+1,gkl,gr);
        
        if (cop%2==1 && 
            cdown%2==1 &&
            cleft%2==1 &&
            cright%2==1){
            islands++;
            grid[gr][gk] = '*';
        }
        //grid[gr][gk] = cright;
    }
}
log();
console.log(islands);

//*...|||FJF7.................