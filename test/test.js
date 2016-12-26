const assert = require("assert");
const physics = require("../src/physics.js");

describe("physics", () => {
    describe("#roll(obj1)", () => {
        it("should have dTheta == dx when on ground", () => {
            const obj1 = {
                ball: true,
                y: 500,
                height: 50,
                dTheta: 0,
                dx: 50,
                dThetaMax: 55,
            };
            const area = { height: 500 };
            physics.area(area);
            physics.roll(obj1);
            assert.equal(obj1.dTheta, obj1.dx);
        });
    });
});
