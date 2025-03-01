import { Hexagon } from './hexagon.js';

describe('Hexagon.setVertices()', () => {
    it('должен создать 6 вершин на основе радиуса', () => {
        const radius = 10;
        const hexagon = new Hexagon(0, 0, radius, 0, 0, 'red');

        // Проверяем, что вычислено ровно 6 вершин
        expect(hexagon.vertices.length).toBe(6);

        // Для каждой вершины рассчитываем ожидаемые координаты и сравниваем с вычисленными
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const expectedX = radius * Math.cos(angle);
            const expectedY = radius * Math.sin(angle);
            expect(hexagon.vertices[i].x).toBeCloseTo(expectedX);
            expect(hexagon.vertices[i].y).toBeCloseTo(expectedY);
        }
    });
});

describe('Hexagon.getVertices()', () => {
    it('должен возвращать абсолютные координаты вершин с учетом позиции фигуры', () => {
        const x = 100, y = 100, radius = 10;
        const hexagon = new Hexagon(x, y, radius, 0, 0, 'blue');

        // Вычисляем ожидаемые абсолютные координаты вершин
        const expectedVertices = [];
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            expectedVertices.push({
                x: x + radius * Math.cos(angle),
                y: y + radius * Math.sin(angle)
            });
        }

        const vertices = hexagon.getVertices();
        expect(vertices.length).toBe(6);
        vertices.forEach((vertex, i) => {
            expect(vertex.x).toBeCloseTo(expectedVertices[i].x);
            expect(vertex.y).toBeCloseTo(expectedVertices[i].y);
        });
    });
});

describe('Hexagon.draw()', () => {
    it('должен вызывать методы контекста canvas с правильными параметрами', () => {
        const x = 100, y = 100, radius = 10;
        const color = 'green';
        const hexagon = new Hexagon(x, y, radius, 0, 0, color);

        // Создаем поддельный (mock) контекст canvas
        const fakeCtx = {
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            closePath: jest.fn(),
            fill: jest.fn(),
            fillStyle: ''
        };

        hexagon.draw(fakeCtx);
        const vertices = hexagon.getVertices();

        // Проверяем вызовы методов рисования
        expect(fakeCtx.beginPath).toHaveBeenCalled();
        expect(fakeCtx.moveTo).toHaveBeenCalledWith(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            expect(fakeCtx.lineTo).toHaveBeenCalledWith(vertices[i].x, vertices[i].y);
        }
        expect(fakeCtx.closePath).toHaveBeenCalled();
        expect(fakeCtx.fillStyle).toBe(color);
        expect(fakeCtx.fill).toHaveBeenCalled();
    });
});
