const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class dumboOctopus {

    constructor(data) {
        this.energyMap = [];
        this.stepFlashed = [];
        this.step =0;
        this.flashed = 0;

        data.split(/\r?\n/).forEach(row => {
            let rowData =[];
            for (let column = 0; column < row.length; column++) {
                const value = parseInt(row[column]);
                rowData.push(value);
            }
            this.energyMap.push(rowData);
        });

    }

    energyUp(x,y) {
        if (x < 0 || y < 0) return;
        if (y >= this.energyMap.length) return;
        if (x >= this.energyMap[y].length) return;
        if (this.containsCoordinate(x,y,this.stepFlashed)) return;

        let grid = this.energyMap[y][x];
        if (grid === 9 ) {
            // Boom! Flash!
            this.flashed += 1;
            this.energyMap[y][x] = 0;
            this.stepFlashed.push([x,y]);
            // impact surrounding
            this.neighbourEnergyUp(x,y);
        } else {
            this.energyMap[y][x] += 1;
        }
    }

    neighbourEnergyUp(inx,iny) {
        for (let x = -1; x <=1; x++) {
            for (let y = -1; y <=1; y++) {
                if (x===0&&y===0) continue;
                this.energyUp(inx+x,iny+y);
            }
        }
    }

    getCell(x,y) {
        return this.energyMap[y][x];
    }

    nextStep() {

        this.stepFlashed = [];
        this.step += 1;

        // energy up
        for (let y = 0; y < this.energyMap.length; y++) {
            const row = this.energyMap[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                this.energyUp(x,y);
            }
            
        }

    }

    containsCoordinate(x,y,arr) {
        for (let i = 0; i < arr.length; i++) {
            const cell = arr[i];
            if (cell[0]==x&&cell[1]==y) return true;
            
        }
        return false;
    }

    printEnergyMap () {
        console.log('');
        console.log('Energymap at step ',this.step);

        for (let y = 0; y < this.energyMap.length; y++) {
            const row = this.energyMap[y];
            let line = '';
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                
                if (this.containsCoordinate(x,y,this.stepFlashed)) {
                    line += ' |'+this.getCell(x,y)+'| ';
                } else {
                    line += '  '+this.getCell(x,y)+'  ';
                }
                

            }
            console.log(line);

        }
    }

}

const game = new dumboOctopus(data);

game.printEnergyMap();
for (let i = 1; i <= 1000; i++) {
    game.nextStep();
    if(game.stepFlashed.length === (game.energyMap.length * game.energyMap[0].length)) {
        console.log('step',i);
        break;
    }
}
console.log(game.flashed);