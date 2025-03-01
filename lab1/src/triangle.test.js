import { Triangle } from './triangle.js';

describe('Triangle.setVertices()', () => {
    it('должен создать 3 вершины на основе радиуса', () => {
        const radius = 10;
        const triangle = new Triangle(0, 0, radius, 0, 0, 'red');

        const expectedVertices = [
            { x: radius * Math.cos(-Math.PI / 2), y: radius * Math.sin(-Math.PI / 2) },
            { x: radius * Math.cos(Math.PI / 6), y: radius * Math.sin(Math.PI / 6) },
            { x: radius * Math.cos(5 * Math.PI / 6), y: radius * Math.sin(5 * Math.PI / 6) }
        ];

        expect(triangle.vertices.length).toBe(3);
        expectedVertices.forEach((vertex, i) => {
            expect(triangle.vertices[i].x).toBeCloseTo(vertex.x);
            expect(triangle.vertices[i].y).toBeCloseTo(vertex.y);
        });
    });
});

describe('Triangle.getVertices()', () => {
    it('должен возвращать абсолютные координаты вершин с учетом позиции фигуры', () => {
        const x = 100, y = 100, radius = 10;
        const triangle = new Triangle(x, y, radius, 0, 0, 'blue');

        const expectedVertices = [
            { x: x + radius * Math.cos(-Math.PI / 2), y: y + radius * Math.sin(-Math.PI / 2) },
            { x: x + radius * Math.cos(Math.PI / 6), y: y + radius * Math.sin(Math.PI / 6) },
            { x: x + radius * Math.cos(5 * Math.PI / 6), y: y + radius * Math.sin(5 * Math.PI / 6) }
        ];

        const vertices = triangle.getVertices();
        expect(vertices.length).toBe(3);
        expectedVertices.forEach((vertex, i) => {
            expect(vertices[i].x).toBeCloseTo(vertex.x);
            expect(vertices[i].y).toBeCloseTo(vertex.y);
        });
    });
});

describe('Triangle.draw()', () => {
    it('должен вызывать методы контекста canvas с правильными параметрами', () => {
        const x = 100, y = 100, radius = 10;
        const triangle = new Triangle(x, y, radius, 0, 0, 'green');

        // Создаем поддельный (mock) контекст canvas
        const fakeCtx = {
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            closePath: jest.fn(),
            fill: jest.fn(),
            fillStyle: ''
        };

        triangle.draw(fakeCtx);
        const vertices = triangle.getVertices();

        // Проверяем, что вызовы происходят в нужном порядке и с правильными координатами
        expect(fakeCtx.beginPath).toHaveBeenCalled();
        expect(fakeCtx.moveTo).toHaveBeenCalledWith(vertices[0].x, vertices[0].y);
        expect(fakeCtx.lineTo).toHaveBeenCalledWith(vertices[1].x, vertices[1].y);
        expect(fakeCtx.lineTo).toHaveBeenCalledWith(vertices[2].x, vertices[2].y);
        expect(fakeCtx.closePath).toHaveBeenCalled();

        // Проверяем установку цвета и вызов fill()
        expect(fakeCtx.fillStyle).toBe('green');
        expect(fakeCtx.fill).toHaveBeenCalled();
    });
});
