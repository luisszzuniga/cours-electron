const { SquareStatusEnum } = require("./Enums/SquareStatusEnum");

class Square
{
    static BurnIterationsDuration = 2;
    static ProbabilityToBeBurnedCold = 0.4;

    constructor(x, y, hasVegetation) {
        this.x = x;
        this.y = y;
        this.status = SquareStatusEnum.Cold;
        this.hasVegetation = hasVegetation; // true or false
    }

    setToBurning() {
        this.burnIterations = 1;
        this.status = SquareStatusEnum.Burning;
    }

    setToBurnedHot() {
        this.status = SquareStatusEnum.BurnedHot;
    }

    // Le statut Burning dure pendant x itérations, après on passe à BurnedHot
    changeBurningStatus() {
        if (this.burnIterations > Square.BurnIterationsDuration) {
            this.setToBurnedHot();
            return;
        }

        this.burnIterations++;
        return;
    }

    changeBurnedHotStatus() {
        // Si la case est BurnedHot, il y a une probabilité de 40% qu'elle passe à BurnedCold
        if (Math.random() < Square.ProbabilityToBeBurnedCold) {
            this.status = SquareStatusEnum.BurnedCold;
        }
    }

    isCold() {
        return this.status === SquareStatusEnum.Cold;
    }

    isBurning() {
        return this.status === SquareStatusEnum.Burning;
    }

    isBurnedHot() {
        return this.status === SquareStatusEnum.BurnedHot;
    }

    canBurn() {
        return this.hasVegetation;
    }

    toJson() {
        return {
            x: this.x,
            y: this.y,
            status: this.status.value
        };
    }
}

module.exports = { Square };