import { Shape } from './shape';

describe('Shape.move()', () => {
    let canvas;
    beforeEach(() => {
        // Создаем "холст" с фиксированными размерами для тестирования
        canvas = { width: 100, height: 100 };
    });

    it('координаты центра должны увеличиться после move', () => {
        const shape = new Shape(10, 10, 5, 2, 3, 'red');
        shape.move(canvas);
        expect(shape.x).toBe(12);
        expect(shape.y).toBe(13);
    });

    it('должен отскочить от левой границы', () => {
        const shape = new Shape(5, 50, 5, -3, 0, 'blue');
        shape.move(canvas);
        expect(shape.speedX).toBe(3);
    });

    it('должен отскочить от верхней границы', () => {
        const shape = new Shape(50, 5, 5, 0, -4, 'green');
        shape.move(canvas);
        expect(shape.speedY).toBe(4);
    });

    it('должен отскочить от правой', () => {
        const shape = new Shape(95, 50, 5, 4, 0, 'yellow');
        shape.move(canvas);
        expect(shape.speedX).toBe(-4);
    });

    it('должен отскочить от нижней', () => {
        const shape = new Shape(50, 95, 5, 0, 6, 'purple');
        shape.move(canvas);
        expect(shape.speedY).toBe(-6);
    });
});

describe('Shape.getVertices()', () => {
    it('нет вершин -> нет результата', () => {
        const shape = new Shape(20, 20, 5, 0, 0, 'black');
        expect(shape.getVertices()).toEqual([]);
    });

    it('должен вернуть вершины в мировых координатах', () => {
        const shape = new Shape(10, 10, 5, 0, 0, 'black');
        shape.vertices = [
            { x: 5, y: 0 },
            { x: 0, y: 5 }
        ];
        const computed = shape.getVertices();
        expect(computed).toEqual([
            { x: 15, y: 10 },
            { x: 10, y: 15 }
        ]);
    });

    it('должен обновить положение вершин', () => {
        const shape = new Shape(10, 10, 5, 0, 0, 'black');
        shape.vertices = [
            { x: 5, y: 0 }
        ];
        const vertices1 = shape.getVertices();
        expect(vertices1).toEqual([{ x: 15, y: 10 }]);
        //двигаем фигуру
        //не придумал как проверить, что вершины не пересчитывались
        shape.x = 20;
        shape.y = 20;
        const vertices2 = shape.getVertices();
        expect(vertices2).toEqual([{ x: 25, y: 20 }]);
    });
});

describe('Shape.checkCollision()', () => {
    it('должны пройти проверку "быстрого" коллайдера', () => {
        const shape1 = new Shape(10, 10, 5, 0, 0, 'red');
        // Располагаем вторую фигуру так, что расстояние между центрами меньше суммы радиусов
        const shape2 = new Shape(14, 10, 5, 0, 0, 'blue');
        expect(shape1.checkCollision(shape2)).toBeTruthy();
    });

    it('не должны пройти даже быстрый коллайдер', () => {
        const shape1 = new Shape(10, 10, 5, 0, 0, 'red');
        const shape2 = new Shape(30, 30, 5, 0, 0, 'blue');
        // Расстояние между центрами значительно больше суммы радиусов
        expect(shape1.checkCollision(shape2)).toBeFalsy();
    });
});

describe('Shape.sides', () => {
    test('getTop() должен возвращать y + top', () => {
        const shape = new Shape(10, 20, 5, 0, 0, 'red');
        shape.top = 5; // ожидаем: 20 + 5 = 25
        expect(shape.getTop()).toBe(25);
    });

    test('getBottom() должен возвращать y + bottom', () => {
        const shape = new Shape(10, 20, 5, 0, 0, 'red');
        shape.bottom = -3; // ожидаем: 20 + (-3) = 17
        expect(shape.getBottom()).toBe(17);
    });

    test('getLeft() должен возвращать x + left (так как второй метод getLeft переопределяет первый)', () => {
        const shape = new Shape(30, 40, 5, 0, 0, 'blue');
        // Значения left и right могут быть заданы отдельно, но из-за переопределения используется только right.
        shape.left = 2;
        shape.right = 7;   // ожидаем: 30 + 7 = 37
        expect(shape.getLeft()).toBe(32);
    });
    test('getRight() должен возвращать x + right (так как второй метод getLeft переопределяет первый)', () => {
        const shape = new Shape(30, 40, 5, 0, 0, 'blue');
        // Значения left и right могут быть заданы отдельно, но из-за переопределения используется только right.
        shape.left = 2;
        shape.right = 7;   // ожидаем: 30 + 7 = 37
        expect(shape.getRight()).toBe(37);
    });
});