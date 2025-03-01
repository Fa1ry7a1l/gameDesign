import { checkCirclePolygonCollision, checkPolygonCollision } from './collision.js';
import { Circle } from './circle.js';
import { Triangle } from './triangle.js';

describe('checkCirclePolygonCollision Circle + Triangle', () => {
    it('должен вернуть false, если круг не пересекает граней треугольника', () => {
        const triangle = new Triangle(0, 0, 10, 0, 0, 'red');
        const circle = new Circle(50, 50, 5, 0, 0, 'blue');
        expect(checkCirclePolygonCollision(circle, triangle)).toBeFalsy();
    });

    it('должен вернуть true, если круг пересекает грань треугольника', () => {
        const triangle = new Triangle(0, 0, 10, 0, 0, 'red');
        const circle = new Circle(4, -7, 3, 0, 0, 'blue');
        expect(checkCirclePolygonCollision(circle, triangle)).toBeTruthy();
    });
});

describe('checkPolygonCollision Triangle + Triangle', () => {
    it('должен вернуть true, если грани двух треугольников пересекаются', () => {
        const triangle1 = new Triangle(0, 0, 10, 0, 0, 'red');
        const triangle2 = new Triangle(5, 0, 10, 0, 0, 'blue');
        expect(checkPolygonCollision(triangle1, triangle2)).toBeTruthy();
    });

    it('должен вернуть false, если треугольники не пересекаются', () => {
        const triangle1 = new Triangle(0, 0, 10, 0, 0, 'red');
        const triangle2 = new Triangle(100, 100, 10, 0, 0, 'blue');
        expect(checkPolygonCollision(triangle1, triangle2)).toBeFalsy();
    });

    it('должен вернуть false, если один треугольник полностью внутри другого, но их грани не пересекаются', () => {
        const outerTriangle = new Triangle(0, 0, 20, 0, 0, 'red');
        const innerTriangle = new Triangle(0, 0, 5, 0, 0, 'blue');
        // Алгоритм проверки пересечения граней не фиксирует такую ситуацию
        expect(checkPolygonCollision(outerTriangle, innerTriangle)).toBeFalsy();
    });
});
