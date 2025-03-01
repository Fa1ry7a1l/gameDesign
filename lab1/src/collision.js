export function checkCirclePolygonCollision(circle, polygon) {
    const vertices = polygon.getVertices();
    for (let i = 0; i < vertices.length; i++) {
        let p1 = vertices[i];
        let p2 = vertices[(i + 1) % vertices.length];
        if (checkLineCircleIntersection(p1, p2, circle)) {
            return true;
        }
    }
    return false;
}

export function checkPolygonCollision(shape1, shape2) {
    const vertices1 = shape1.getVertices();
    const vertices2 = shape2.getVertices();

    for (let i = 0; i < vertices1.length; i++) {
        let p1 = vertices1[i];
        let p2 = vertices1[(i + 1) % vertices1.length];
        for (let j = 0; j < vertices2.length; j++) {
            let q1 = vertices2[j];
            let q2 = vertices2[(j + 1) % vertices2.length];
            if (checkLineIntersection(p1, p2, q1, q2)) {
                return true;
            }
        }
    }
    return false;
}

function checkLineIntersection(p1, p2, q1, q2) {
    function crossProduct(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }

    let r = { x: p2.x - p1.x, y: p2.y - p1.y };
    let s = { x: q2.x - q1.x, y: q2.y - q1.y };
    let denominator = crossProduct(r, s);
    if (denominator === 0) return false;

    let pq = { x: q1.x - p1.x, y: q1.y - p1.y };
    let t = crossProduct(pq, s) / denominator;
    let u = crossProduct(pq, r) / denominator;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

function checkLineCircleIntersection(p1, p2, circle) {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let fx = p1.x - circle.x;
    let fy = p1.y - circle.y;

    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = (fx * fx + fy * fy) - circle.radius * circle.radius;

    let discriminant = b * b - 4 * a * c;
    return discriminant >= 0;
}
