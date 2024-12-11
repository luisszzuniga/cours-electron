class SquareTypeEnum {
    static Vegetation = new SquareTypeEnum("Vegetation");
    static Nothing = new SquareTypeEnum("Nothing");

    constructor(value) {
        this.value = value;
    }

    isFlammable() {
        return this === SquareTypeEnum.Vegetation;
    }
}