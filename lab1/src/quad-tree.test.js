import QuadTree from './quad-tree';
import Rectangle from './rectangle';
import {Circle} from "./circle";

describe('QuadTree', () => {

    describe('Constructor', () => {
        it('должен выбрасывать ошибку, если boundary равен null или undefined', () => {
            expect(() => new QuadTree(null)).toThrow(TypeError);
            expect(() => new QuadTree(undefined)).toThrow(TypeError);
        });

        it('должен выбрасывать ошибку, если boundary не является экземпляром Rectangle', () => {
            expect(() => new QuadTree({})).toThrow(TypeError);
        });
    });

    describe('buildTree', () => {
        it('должен просто сохранить контейнер и не создавать дочерние узлы, если общее число фигур меньше или равно capacity', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            const quadTree = new QuadTree(boundary, 4);

            // Dummy-фигура с минимальным набором методов
            const dummyShape = {
                getLeft: () => 10,
                getRight: () => 20,
                getTop: () => 90,
                getBottom: () => 10,
                checkCollision: () => false
            };
            const container = {
                circles: [dummyShape],
                triangle: [],
                hexagon: []
            };

            quadTree.buildTree(container);
            expect(quadTree._container).toEqual(container);
            expect(quadTree._hasChildren).toBe(false);
            expect(quadTree._children.length).toBe(0);
        });

        it('должен создать дочерние узлы (subdivision), если общее число фигур больше capacity', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            // Устанавливаем capacity равным 1, чтобы любая группа фигур больше 1 приводила к разделению
            const quadTree = new QuadTree(boundary, 1);
            const dummyShape = {
                getLeft: () => 10,
                getRight: () => 20,
                getTop: () => 10,
                getBottom: () => 20,
                checkCollision: () => false
            };
            const container = {
                circles: [dummyShape, dummyShape],
                triangle: [dummyShape],
                hexagon: [dummyShape]
            };
            quadTree.buildTree(container);
            expect(quadTree._hasChildren).toBe(true);
            expect(quadTree._children.length).toBeGreaterThan(0);
        });
        it('должен создать дочерние узлы (subdivision), если общее число фигур больше capacity, но не созхдаст из за перекрытия границами прямоугольников ', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            const quadTree = new QuadTree(boundary, 1);
            const dummyShape = {
                getLeft: () => 10,
                getRight: () => 80,
                getTop: () => 10,
                getBottom: () => 20,
                checkCollision: () => false
            };
            const container = {
                circles: [dummyShape, dummyShape],
                triangle: [dummyShape],
                hexagon: [dummyShape]
            };
            quadTree.buildTree(container);
            expect(quadTree._hasChildren).toBe(false); // не попадаем в пересечения
            expect(quadTree._children.length).toBe(0);
        });
    });

    describe('isInside', () => {
        it('должен возвращать true, если фигура полностью находится внутри границ', () => {
            const fakeBound = {left: 0, right: 100, top: 80, bottom: 0};
            const quadTree = new QuadTree(new Rectangle(0, 0, 100, 100));
            const dummyShape = {
                getLeft: () => 10,
                getRight: () => 90,
                getTop: () => 90,
                getBottom: () => 0
            };
            expect(quadTree.isInside(fakeBound, dummyShape)).toBe(true);
        });

        it('должен возвращать false, если фигура не полностью находится внутри границ', () => {
            const fakeBound = {left: 0, right: 100, top: 100, bottom: 0};
            const quadTree = new QuadTree(new Rectangle(0, 0, 100, 100));
            const dummyShape = {
                getLeft: () => -10,
                getRight: () => 90,
                getTop: () => 90,
                getBottom: () => 10
            };
            expect(quadTree.isInside(fakeBound, dummyShape)).toBe(false);
        });
    });

    describe('calculateCollision', () => {
        it('должен вызывать contactCallback для столкновений фигур, находящихся в контейнере', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            const quadTree = new QuadTree(boundary, 10);

            // Создадим dummy-фигуры для circles и triangle, которые всегда "сталкиваются"
            const dummyCircle1 = {
                checkCollision: jest.fn(() => true),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0,
                getVertices : jest.fn(() => []),
            };
            const dummyCircle2 = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0

            };
            const dummyTriangle = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };

            // Располагаем 2 круга и 1 треугольник; hexagon оставляем пустым
            quadTree._container = {
                circles: [dummyCircle1, dummyCircle2],
                triangle: [dummyTriangle],
                hexagon: []
            };
            // Отсутствие дочерних узлов – для простоты теста
            quadTree._children = [];

            const contactCallback = jest.fn();
            quadTree.calculateCollision(contactCallback);

            expect(contactCallback).toHaveBeenCalledTimes(1);
        });
    });

    describe('digCircle', () => {
        it('должен вызывать contactCallback для столкновений между переданным кругом и фигурами из контейнера', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            const quadTree = new QuadTree(boundary, 10);

            const dummyCircleInContainer = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            const dummyTriangle = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            const dummyHexagon = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            quadTree._container = {
                circles: [dummyCircleInContainer],
                triangle: [dummyTriangle],
                hexagon: [dummyHexagon]
            };
            quadTree._children = []; // дочерних узлов нет

            const testCircle = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            const contactCallback = jest.fn();
            quadTree.digCircle(contactCallback, testCircle);
            expect(contactCallback).toHaveBeenCalledTimes(1); //т.к вершин то нет, значит и не коллайдимся
        });
    });

    describe('digPoly', () => {
        it('должен вызывать contactCallback для столкновений между переданной фигурой (poly) и фигурами из контейнера', () => {
            const boundary = new Rectangle(0, 0, 100, 100);
            const quadTree = new QuadTree(boundary, 10);

            const dummyCircle = new Circle(12,12,10,0,0,"red")
            const dummyTriangle = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            const dummyHexagon = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => []),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            quadTree._container = {
                circles: [dummyCircle],
                triangle: [dummyTriangle],
                hexagon: [dummyHexagon]
            };
            quadTree._children = []; // дочерних узлов нет

            const testPoly = {
                checkCollision: jest.fn(() => true),
                getVertices : jest.fn(() => [{x:0,y:0},{x:10,y:0},{x:10,y:10},{x:0,y:10}]),
                getLeft: () => 0,
                getRight: () => 10,
                getTop: () => 10,
                getBottom: () => 0
            };
            const contactCallback = jest.fn();
            quadTree.digPoly(contactCallback, testPoly);
            expect(contactCallback).toHaveBeenCalledTimes(1);
        });
    });

});
