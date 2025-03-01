import { Circle } from './circle.js';

describe('Circle.draw()', () => {
    it('должен корректно вызывать методы canvas для рисования круга', () => {
        const x = 100, y = 100, radius = 50, color = 'blue';
        const circle = new Circle(x, y, radius, 0, 0, color);

        // Создаем поддельный (mock) контекст canvas
        const fakeCtx = {
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            closePath: jest.fn(),
            fillStyle: ''
        };

        circle.draw(fakeCtx);

        // Проверяем вызовы методов контекста
        expect(fakeCtx.beginPath).toHaveBeenCalled();
        expect(fakeCtx.arc).toHaveBeenCalledWith(x, y, radius, 0, Math.PI * 2);
        expect(fakeCtx.fillStyle).toBe(color);
        expect(fakeCtx.fill).toHaveBeenCalled();
        expect(fakeCtx.closePath).toHaveBeenCalled();
    });
});
