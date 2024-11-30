const fs = require('fs');
const testdata = fs.readFileSync('./testdata.txt',{encoding:'utf8', flag:'r'});
const data = fs.readFileSync('./data.txt',{encoding:'utf8', flag:'r'});

class tunnelMapper {

    constructor (data) {
        this.paths = [];
        data.split(/\r?\n/).forEach(row => {
            this.paths.push(row.split(/-/));
        });
    }

    beginJourney() {
        const routes = this.findRoutes('start','start',[]);
        routes.sort();
        console.log('done',routes.length);
    }

    cannotWeGoHere1(nextCave,currentRoute){
        return (nextCave.toLowerCase() === nextCave && currentRoute.split(/,/).indexOf(nextCave)>-1);
    }

    cannotWeGoHere2(nextCave,currentRoute){

        if (nextCave === 'start') return true;
        if (currentRoute.split(/,/).indexOf('end')>-1) return true;

        let routeArray = currentRoute.split(/,/);

        if (nextCave.toLowerCase() === nextCave) {
            
            // was there a double small cave visit
            let double =  false;
            let visitedSmall = [];
            for (let i = 0; i < routeArray.length; i++) {
                const cave = routeArray[i];
                if (cave.toLowerCase()===cave) {
                    if (visitedSmall.indexOf(cave)>-1) double = true;
                    visitedSmall.push(cave);
                }
            }
            
            if (visitedSmall.indexOf(nextCave)>-1&&double) return true;
        }

        return false;
    }

    findRoutes (currentCave,currentRoute) {

        const nextCaves = this.findNextCaves(currentCave);

        const posibleRoutes = [];
        for (let i = 0; i < nextCaves.length; i++) {

            const nextCave = nextCaves[i];
            let posibleRoute = currentRoute + ',' + nextCave;

            // can we go to this cave?
            if (this.cannotWeGoHere2(nextCave,currentRoute)){
                // visited small cave, go to next
                continue;
            }

            if (nextCave === 'end') {
                // at the end of a route
                posibleRoutes.push(posibleRoute);
            } else {
                let result = this.findRoutes(nextCave,posibleRoute);
                result.forEach(r =>{    
                    posibleRoutes.push(r);
                });
            }
        }
        return posibleRoutes;
    }

    findNextCaves(currentCave) {
        const nextCaves = [];
        this.paths.forEach(path => {
            if (path[0] === currentCave) nextCaves.push(path[1]);
            if (path[1] === currentCave) nextCaves.push(path[0]);
        });
        return nextCaves;
    }

}

const game = new tunnelMapper(data);
game.beginJourney();