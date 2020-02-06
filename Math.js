"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Contains(pointx, pointy, xmin, xmax, ymin, Ymax) {
    if (pointx < xmax && pointx > xmin
        && pointy < Ymax && pointy > ymin) {
        return true;
    }
    else
        return false;
}
exports.Contains = Contains;
