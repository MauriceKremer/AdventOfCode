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


let roundTrip = [];
for (let position of positions) {
    let fz;
    let rt = 0;
    let d = route.split('');
    while (true) {
        let direction = d.shift();
        rt++;
        d.push(direction); // allow loop around
        position = n[position][(direction=='L')?0:1];
        if (position.endsWith('Z') && fz == undefined) {
            fz = position;
            rt=0;
        } else if (position.endsWith('Z')) {
            roundTrip.push(rt);
            break;
        }
    }

}

console.log(roundTrip);

function leastCommonDevider(arr) { 
    function gcd(a, b) { 
      if (b === 0) return a; 
      return gcd(b, a % b); 
    } 
    
    let res = arr[0]; 
    
    for (let i = 1; i < arr.length; i++) { 
      res = (res * arr[i]) / gcd(res, arr[i]); 
    } 
    
    return res; 
  } 


console.log(leastCommonDevider(roundTrip));