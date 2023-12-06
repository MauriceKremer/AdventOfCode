let data = {};
function getLoadResult() {
    return data;
}

let nextDescription = false;
let mapType = [];
let seeds = [];

function parseLine(text) {
    if (text.substr(0,5) == 'seeds') {
        seeds = text.split(':')[1].trim().split(' ');
        data = {};
        console.log(seeds);
    } else if (text.trim().length == 0) {
        // next is description
        nextDescription = true;
    } else if (nextDescription) {
        nextDescription = false;
        mapType = readmaptype(text);
    } else {
        let parts = text.split(' ');
        mapResources(mapType['src'],mapType['target'],parts[0],parts[1],parts[2]);
    }
}

function readSeeds() {
    let results = [];
    for (let i in seeds) {
        let seed = seeds[i];
        console.log ('seed num: ' + seed);
        let ready = false;
        let target = 'seed';
        let pos = parseInt(seed);
        while (!ready) {
            let newpos = findInMap(target,pos);
            if ('location' ==  newpos['target']) {
                ready = true;
            }
            target = newpos['target'];
            pos = newpos['pos'];
        }
        results.push(pos);
    }
    return results;
}

function findInMap(srctype,srcnum) {
    let range = data[srctype];
    for (let i in range) {
        let spec = range[i];
        if (srcnum >= spec.src && srcnum <= spec.src + spec.range) {
            let pos = srcnum - spec.src + spec.dst;
            //console.log(srctype,srcnum,spec.target,pos,i);
            return {'pos':pos,'target':spec.target};
        }
    }
    //console.log(srctype,srcnum,range[0].target,srcnum);
    return {'pos':srcnum,'target':range[0].target};
}

function readmaptype (text){
    //seed-to-soil map:
    let parts = text.split(/-|\s/);
    return {
        "src" : parts[0],
        "target" : parts[2]
    };
}

function mapResources(source, target, dst, src, range) {
    let dataranges =[];
    if (data.hasOwnProperty(source)) dataranges = data[source];

    dataranges.push( {
        "target" : target,
        "dst" : parseInt(dst),
        "src" : parseInt(src),
        "range" : parseInt(range)
    });
    data[source] = dataranges;
}

module.exports = { mapResources,getLoadResult,readmaptype,parseLine,readSeeds};