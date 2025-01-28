const { Square } = require("./Square");
const { ForestWindForceEnum } = require("./Enums/ForestWindForceEnum");
const { ForestGroundTypeEnum } = require("./Enums/ForestGroundTypeEnum");
const { ForestVegetationTypeEnum } = require("./Enums/ForestVegetationTypeEnum");

class Forest
{
    static SquaresCount = 10000;
    static InitialFlammedSquares = 2;
    static DefaultIterations = 50;

    constructor(iterations, wind, ground, vegetation) {
        this.iterations = iterations;
        this.currentIteration = 0;
        this.windForce = ForestWindForceEnum[wind];
        this.groundType = ForestGroundTypeEnum[ground];
        this.vegetation = ForestVegetationTypeEnum[vegetation];

        this.checkSquaresCount();
        this.buildSquares();
        this.setRandomFlammedSquares();
    }

    checkSquaresCount() {
        // Il faut que la racine carrée de SquaresCount soit un entier
        const sqrt = Math.sqrt(Forest.SquaresCount);
        if (sqrt !== Math.floor(sqrt)) {
            throw new Error("SquaresCount must be a square number");
        }
    }

    buildSquares() {
        this.squares = new Array(Forest.SquaresCount);
        const sqrt = Math.sqrt(Forest.SquaresCount);

        let index = 0;

        for (let x = 0; x < sqrt; x++) {
            for (let y = 0; y < sqrt; y++) {
                const hasVegetation = this.probability(this.vegetation.vegetationProbability);
                
                this.squares[index++] = new Square(x, y, hasVegetation);
            }
        }
    }

    setRandomFlammedSquares() {
        for (let i = 0; i < Forest.InitialFlammedSquares; i++) {
            const randomIndex = Math.floor(Math.random() * Forest.SquaresCount);
            this.squares[randomIndex].setToBurning();
        }
    }

    iterate() {
        if (this.currentIteration >= this.iterations) {
            return;
        }

        this.currentIteration++;

        this.iterateBurningSquares();
        this.iterateBurnedHotSquares();
    }

    iterateBurningSquares() {
        // Parcourir toutes les cases burning pour vérifier si elles doivent passer à BurnedHot
        const burningSquares = this.squares.filter(square => square.isBurning());
        for (const square of burningSquares) {
            square.changeBurningStatus();

            // Si la case est passée à BurnedHot, on ne fait rien de plus
            if (square.isBurnedHot()) {
                continue;
            }

            // Si la case est toujours en Burning, on regarde si elle doit propager le feu
            this.propagateFire(square);
        }
    }

    iterateBurnedHotSquares() {
        // On parcourt toutes les cases au statut BurnedHot, c'est les seules qui déclenchent de la propagation de feu.
        const burnedHotSquares = this.squares.filter(square => square.isBurnedHot());
        for (const burnedHotSquare of burnedHotSquares) {
            // Les cases BurnedHot ont une probabilité inférieure de propager le feu
            const probability = 0.005 * (1 - this.windForce.probability);

            if (this.probability(probability)) {
                this.propagateFire(burnedHotSquare);
            }

            burnedHotSquare.changeBurnedHotStatus();
        }
    }

    getSquares() {
        return this.squares.map(square => square.toJson());
    }

    propagateFire(square) {
        const neighbors = this.getNeighbors(square);
        for (const neighbor of neighbors) {
            if (neighbor.isCold() && this.probability(this.groundType.flammableProbability) && neighbor.canBurn()) {
                neighbor.setToBurning();
            }
        }
    }

    getNeighbors(square) {
        const neighbors = [];
        
        for (const probabilitySquare of this.windForce.probabilityGrid) {
            const neighbor = this.findSquare(square.x + probabilitySquare.dx, square.y + probabilitySquare.dy);

            const probability = probabilitySquare.probability;

            if (neighbor && this.probability(probability)) {
                neighbors.push(neighbor);
            }
        }

        return neighbors;
    }

    probability(probability) {
        const random = Math.random();
        return random < probability;
    }

    getIterations() {
        return this.iterations;
    }

    findSquare(x, y) {
        return this.squares.find(square => square.x === x && square.y === y);
    }
}

module.exports = { Forest };