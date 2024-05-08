const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class hightMapParser {

    constructor(data) {
        this.area = [];
        this.totalRisk = 0;
        data.split(/\r?\n/).forEach(row => {
            let rowData =[];
            for (let column = 0; column < row.length; column++) {
                const value = parseInt(row[column]);
                rowData.push(value);
            }
            this.area.push(rowData);
        });
    }

    getValue(c) {

        let x= c[0];
        let y= c[1];

        if (x < 0 || y < 0) return 97;
        if (y >= this.area.length) return 98;
        if (x >= this.area[y].length) return 99;
        return this.area[y][x];
    }

    getUp(x,y)    {return [x,y-1];}
    getDown(x,y)  {return [x,y+1];}
    getLeft(x,y)  {return [x-1,y];}
    getRight(x,y) {return [x+1,y];}
    
    parseLows() {

        this.lows=[];

        for (let rowIndex = 0; rowIndex < this.area.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < this.area[rowIndex].length; columnIndex++) {

                let thisCell = this.getValue([columnIndex,rowIndex]);
                let _up = this.getValue(this.getUp(columnIndex,rowIndex));
                let _down = this.getValue(this.getDown(columnIndex,rowIndex));
                let _left = this.getValue(this.getLeft(columnIndex,rowIndex));
                let _right = this.getValue(this.getRight(columnIndex,rowIndex));

                if (thisCell < Math.min(...[_up,_down,_right,_left])) {
                    let risk = thisCell + 1;
                    this.totalRisk += risk;
                    this.lows.push([columnIndex,rowIndex]);
                }
                
            }
        }
    }

    isPartOfBasin(c) {
        return this.getValue(c)<9;
    }

    isEqualCoordinate (c1,c2) {
        return (c1[0]===c2[0]&&c1[1]===c2[1]);
    }

    alreadyPart(ignoreCoordinates,coordinate) {
        for (let i = 0; i < ignoreCoordinates.length; i++) {
            const ic = ignoreCoordinates[i];
            if (this.isEqualCoordinate(ic,coordinate)) return true;
        }
        return false;
    }

    getNeighbours(coordinate,basinCoordinates){

        let _up    = this.getUp(coordinate[0],coordinate[1]);
        let _down  = this.getDown(coordinate[0],coordinate[1]);
        let _left  = this.getLeft(coordinate[0],coordinate[1]);
        let _right = this.getRight(coordinate[0],coordinate[1]);
        [_up,_down,_right,_left].forEach(c => {
            if (this.isPartOfBasin(c) && !this.alreadyPart(basinCoordinates,c)) {               
                basinCoordinates.push(c);
                basinCoordinates.concat(this.getNeighbours(c,basinCoordinates));
            }
        });
        return basinCoordinates;
    }

    parseBasins() {
        let basinsizes = [];
         for (let i = 0; i < this.lows.length; i++) {
            const low = this.lows[i];
            let basin = this.getNeighbours(low,[low]);
            basinsizes.push(basin.length);
        }
        basinsizes.sort((a,b)=>{return b-a;});
        return basinsizes[0]*basinsizes[1]*basinsizes[2];
    }

}

// test data
let p = new hightMapParser(testdata);
p.parseLows();
if (p.totalRisk !== 15) throw 'This is wrong';
else console.log('CODE IS ROCKIN!');
let final =p.parseBasins();
if (final !== 1134) throw 'This is wrong';
else console.log('CODE IS STILL ROCKIN!');


// the real data
p = new hightMapParser(data);
p.parseLows();
console.log('totalRisk',p.totalRisk);
console.log('parseBasins',p.parseBasins());