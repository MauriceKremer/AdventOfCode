const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8');

const blocks = data.split(/\n\n/);

const seedData = blocks.splice(0,1)[0].split(':')[1].trim().split(' ').map(x=>parseInt(x));
let seeds = [];
for (let i = 0 ; i < seedData.length; i = i+2) {
    seeds.push([seedData[i],seedData[i]+seedData[i+1]]);
}

for (const block of blocks) {
    const ranges = []
    const lines = block.split(/\n/);
    lines.shift(); // remove text line
    for (const line of block.split(/\n/)) {
        ranges.push(line.split(' ').map(x=>parseInt(x)));
    }
    const newseeds = [];
    console.log(seeds.length);
    while (seeds.length>0) {
        const [s,e] = seeds.pop();  // remove seeds and process
        let found = false;
        for (const range of ranges) {
            const [target,source,scope] = range;
            const slice1end = Math.max(s,source);
            const slice2end = Math.min(e,source+scope);
            
            if (slice1end < slice2end) {
                newseeds.push([slice1end - source + target, slice2end - source + target]); // overlap
                if (slice1end>s) seeds.push([s,slice1end]);  // first non overlap
                if (e>slice2end) seeds.push([slice2end,e]);  // last non overlap
                found = true;
                break;
            }
        }   
        if (!found) newseeds.push([s,e]);
    }
    seeds = newseeds;
}
console.log(seeds);
console.log(seeds.map(x=>x[0]).reduce((a, b) => Math.min(a, b))); //50855035
