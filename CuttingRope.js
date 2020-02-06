"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var matter_js_1 = __importDefault(require("matter-js"));
var Composite = matter_js_1.default.Composite;
var Vector = matter_js_1.default.Vector;
function CutRope(Anchors, mousPosx, mousPosy) {
    // to keep track of what to remove
    // Im using indicis becouse I have to return and the rope and the constraint
    var ropeToRemoveFrom = 10;
    var closestDistance = 10000;
    var closestConstraint = 100;
    Anchors.forEach(function (RopeComosite, ropeIndex) {
        // i have to use as unknown as Matter.Constraint[] becouse intellisense incorrectly has return type as Matter.Composite[]
        var rope = Composite.allConstraints(RopeComosite);
        rope.forEach(function (part, partIndex) {
            var distance = Vector.magnitude(Vector.sub(part.bodyA.position, Vector.create(mousPosx, mousPosy)));
            if (distance < closestDistance) {
                closestDistance = distance;
                closestConstraint = partIndex;
                ropeToRemoveFrom = ropeIndex;
            }
        });
    });
    return Vector.create(ropeToRemoveFrom, closestConstraint);
}
;
