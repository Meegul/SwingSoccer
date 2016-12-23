const level0 = {
    mapWidth: 2000,
    mapHeight: 1000,
    backgroundColor: "#999",
    objects: [{ //Stick figure
        player: true,
        friction: 0.86,
        x0: 500,
        y0: 500,
        x: 500,
        y: 500,
        dx: 0,
        dy: 0,
        dTheta: 0,
        dxMax: 10,
        dyMax: 40,
        dThetaMax: 30,
        lines: [{
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 100,
            color: "#FF0000",
        }, {
            x0: 0,
            y0: 100,
            x1: -50,
            y1: 150,
        }, {
            x0: 0,
            y0: 100,
            x1: 50,
            y1: 150,
        }, {
            x0: 0,
            y0: 20,
            x1: -50,
            y1: 20,
        }, {
            x0: 0,
            y0: 20,
            x1: 50,
            y1: 20,
        }],
        circles: [{
            x0: 0,
            y0: -50,
            radius: 50,
            color: "#FF0000",
            fill: true,
        }],
        height: 150,
        width: 50,
        angle: 0,
    }, { //Ball
        player: false,
        ball: true,
        friction: 0.99,
        x0: 750,
        y0: 500,
        x: 750,
        y: 500,
        dx: 10,
        dy: 0,
        dTheta: 0,
        dxMax: 10,
        dyMax: 40,
        dThetaMax: 30,
        lines: [{
            x0: -50,
            y0: 0,
            x1: 50,
            y1: 0,
        }, {
            x0: 0,
            y0: -50,
            x1: 0,
            y1: 50,
        }],
        circles: [{
            x0: 0,
            y0: 0,
            radius: 50,
            color: "#EEE",
            fill: true,
        }],
        height: 50,
        width: 50,
        angle: 0,
    }],
};
