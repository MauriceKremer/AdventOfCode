// const data = [
//     '???.### 1,1,3',
//     '.??..??...?##. 1,1,3',
//     '?#?#?#?#?#?#?#? 1,3,1,6',
//     '????.#...#... 4,1,1',
//     '????.######..#####. 1,6,5',
//     '?###???????? 3,2,1'
// ];

const fs = require('node:fs');
const raw = fs.readFileSync('input.txt', 'utf8');
const data = raw.split(/\n/);

const cache = {};

function count(shape, conf) {
    // hit the end and no remainder return 1? when remainder the invalid and return count 0
    if (shape == '') return (conf.length ==0)?1:0;
  

    // no remaining springs
    if (conf.length == 0) return shape.includes('#')?0:1;
  
    let result = 0;
    let key = shape+conf;
    if (cache.hasOwnProperty(key)) return cache[key];
  
    // shift shape when . or asume . for ? for first position
    if (shape[0] == '.' || shape[0] == '?') {
        result += count(shape.substring(1),conf);
    }
  
    if (shape[0] === "#" || shape[0] === "?") {

        let enoughSymbols = conf[0] <= shape.length;
        let moDotsInRange = !shape.slice(0, conf[0]).includes(".");
        let matchSize = conf[0] === shape.length;
        let nextNotSpring = shape[conf[0]] !== "#";

        if (enoughSymbols && moDotsInRange && (matchSize || nextNotSpring)) {
            result += count(shape.slice(conf[0] + 1), conf.slice(1));
        }
    }
  
    cache[key] = result;
    return result;
  }


let sum = 0;
data.forEach((x)=>{
    let shape = x.split(' ')[0];
    shape = shape + '?' + shape + '?' + shape + '?' + shape + '?' + shape;
    let conf = x.split(' ')[1].split(',').map(y=>parseInt(y));
    conf = conf.concat(conf).concat(conf).concat(conf).concat(conf);
    sum += count(shape,conf);
});
console.log(sum);