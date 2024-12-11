class ForestWindForceEnum {
    static None = new ForestWindForceEnum("None", [
        { dx: -1, dy: 2, probability: 0.01 },
        { dx: 0, dy: 2, probability: 0.01 },
        { dx: 1, dy: 2, probability: 0.01 },

        { dx: -2, dy: 1, probability: 0.01 },
        { dx: -1, dy: 1, probability: 0.2 },
        { dx: 0, dy: 1, probability: 0.3 },
        { dx: 1, dy: 1, probability: 0.2 },
        { dx: 2, dy: 1, probability: 0.01 },

        { dx: -2, dy: 0, probability: 0.01 },
        { dx: -1, dy: 0, probability: 0.3 },
        { dx: 1, dy: 0, probability: 0.3 },
        { dx: 2, dy: 0, probability: 0.01 },

        { dx: -2, dy: -1, probability: 0.01 },
        { dx: -1, dy: -1, probability: 0.2 },
        { dx: 0, dy: -1, probability: 0.3 },
        { dx: 1, dy: -1, probability: 0.2 },
        { dx: 2, dy: -1, probability: 0.01 },

        { dx: -1, dy: -2, probability: 0.01 },
        { dx: 0, dy: -2, probability: 0.01 },
        { dx: 1, dy: -2, probability: 0.01 },
    ]);

    static Moderate = new ForestWindForceEnum("Moderate", [
        { dx: -1, dy: 1, probability: 0.1 },
        { dx: 0, dy: 1, probability: 0.2 },
        { dx: 1, dy: 1, probability: 0.1 },

        { dx: -1, dy: 0, probability: 0.3 },
        { dx: 1, dy: 0, probability: 0.3 },

        { dx: -1, dy: -1, probability: 0.3 },
        { dx: 0, dy: -1, probability: 0.4 },
        { dx: 1, dy: -1, probability: 0.3 },

        { dx: -1, dy: -2, probability: 0.02 },
        { dx: 0, dy: -2, probability: 0.05 },
        { dx: 1, dy: -2, probability: 0.02 },
    ]);

    static Strong = new ForestWindForceEnum("Strong", [
        { dx: -1, dy: 1, probability: 0.05 },
        { dx: 0, dy: 1, probability: 0.1 },
        { dx: 1, dy: 1, probability: 0.05 },

        { dx: -1, dy: 0, probability: 0.25 },
        { dx: 1, dy: 0, probability: 0.25 },

        { dx: -1, dy: -1, probability: 0.4 },
        { dx: 0, dy: -1, probability: 0.5 },
        { dx: 1, dy: -1, probability: 0.4 },

        { dx: -1, dy: -2, probability: 0.05 },
        { dx: 0, dy: -2, probability: 0.1 },
        { dx: 1, dy: -2, probability: 0.05 },

        { dx: 0, dy: -3, probability: 0.01 },
    ]);

    static Violent = new ForestWindForceEnum("Violent", [
        { dx: -1, dy: 1, probability: 0.005 },
        { dx: 0, dy: 1, probability: 0.01 },
        { dx: 1, dy: 1, probability: 0.005 },

        { dx: -1, dy: 0, probability: 0.1 },
        { dx: 1, dy: 0, probability: 0.1 },

        { dx: -1, dy: -1, probability: 0.5 },
        { dx: 0, dy: -1, probability: 0.7 },
        { dx: 1, dy: -1, probability: 0.5 },

        { dx: -1, dy: -2, probability: 0.2 },
        { dx: 0, dy: -2, probability: 0.3 },
        { dx: 1, dy: -2, probability: 0.2 },

        { dx: -1, dy: -3, probability: 0.01 },
        { dx: 0, dy: -3, probability: 0.05 },
        { dx: 1, dy: -3, probability: 0.01 },
    ]);

    constructor(name, probabilityGrid) {
        this.name = name;
        this.probabilityGrid = probabilityGrid
    }
}

module.exports = { ForestWindForceEnum };