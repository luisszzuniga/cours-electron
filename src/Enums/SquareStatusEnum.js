class SquareStatusEnum {
    static Cold = new SquareStatusEnum("Cold");
    static Burning = new SquareStatusEnum("Burning");
    static BurnedHot = new SquareStatusEnum("BurnedHot");
    static BurnedCold = new SquareStatusEnum("BurnedCold");

    constructor(value) {
        this.value = value;
    }

    isFlammable() {
        return this === SquareStatusEnum.Cold;
    }
}

module.exports = { SquareStatusEnum };