class ForestGroundTypeEnum {
    static Humid = new ForestGroundTypeEnum("Humid", 0.1);
    static Normal = new ForestGroundTypeEnum("Normal", 0.3);
    static Dry = new ForestGroundTypeEnum("Dry", 0.6);
    static VeryDry = new ForestGroundTypeEnum("VeryDry", 0.9);

    constructor(value, flammableProbability) {
        this.value = value;
        this.flammableProbability = flammableProbability;
    }
}

module.exports = { ForestGroundTypeEnum };