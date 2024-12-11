class ForestVegetationTypeEnum {
    static Continuous = new ForestVegetationTypeEnum("Continuous", 1.0);
    static Sparse = new ForestVegetationTypeEnum("Sparse", 0.95);
    static Scattered = new ForestVegetationTypeEnum("Scattered", 0.8);
    static Thin = new ForestVegetationTypeEnum("Thin", 0.5);

    constructor(name, vegetationProbability) {
        this.name = name;
        this.vegetationProbability = vegetationProbability;
    }
}

module.exports = { ForestVegetationTypeEnum };