"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var matter_js_1 = __importDefault(require("matter-js"));
var Composites = matter_js_1.default.Composites, Constraint = matter_js_1.default.Constraint, Composite = matter_js_1.default.Composite, World = matter_js_1.default.World, Vector = matter_js_1.default.Vector, Bodies = matter_js_1.default.Bodies;
function CreateRope(x, y, ball, world, group) {
    var anchorPosition = Vector.create(x, y);
    var vectorBalltoAnchor = Vector.sub(ball.position, anchorPosition);
    var distance = Vector.magnitude(vectorBalltoAnchor);
    // creat a rope of the correct lenght
    var rope = Composites.stack(x, y, distance / 25, 1, 5, 5, function (x, y) {
        return Bodies.rectangle(x - 10, y, 25, 20, {
            collisionFilter: { group: group },
            density: 0.0005,
            frictionAir: 0.00001
        });
    });
    //make the stack into a chain
    Composites.chain(rope, 0.4, 0, -0.4, 0, {
        stiffness: 1,
        length: 0,
    });
    // rotate the rope to the ball
    var rad = Vector.angle(Vector.create(10, 0), vectorBalltoAnchor);
    Composite.rotate(rope, rad, anchorPosition);
    // anchor the rope into the world
    var ropeAnchor = Constraint.create({
        pointA: { x: x, y: y },
        bodyB: rope.bodies[0],
        pointB: { x: 0, y: 0 },
        length: 1,
        stiffness: 0.9
    });
    // anchor the end the rope to the ball
    var conntochain = Constraint.create({
        bodyA: rope.bodies[rope.bodies.length - 1],
        bodyB: ball,
        length: 1,
        stiffness: 0.9
    });
    World.add(world, rope);
    World.add(world, [ropeAnchor, conntochain]);
    return rope;
}
