import Rectangle from './rectangle'
import {checkCirclePolygonCollision, checkPolygonCollision} from "./collision";

export default class QuadTree {
    constructor(boundary, capacity = 4) {
        if (!boundary) {
            throw TypeError('boundary is null or undefined')
        }

        if (!(boundary instanceof Rectangle)) {
            throw TypeError('boundary should be a Rectangle')
        }

        this._boundary = boundary
        this._capacity = capacity
        this._hasChildren = false
        this._container = {circles: [], triangle: [], hexagon: []}
        this._children = []
    }

    buildTree(container) {
        // в данной реализации фигуры хранятся только в листовых нодах, при этом фигуры, которые попадают в более, чем 1 листовую,
        // будут по ссылке храниться во всех нодах, куда они попадают
        //По большому счету, можно хранить ноды в массиве, потеряв структуру дерева.

        if (container.circles.length + container.triangle.length + container.hexagon.length <= this._capacity) {
            this._container = container
            this._hasChildren = false
            return
        }

        let futureSubTree =
            [{circles: [], triangle: [], hexagon: []}, {circles: [], triangle: [], hexagon: []}
                , {circles: [], triangle: [], hexagon: []}, {circles: [], triangle: [], hexagon: []}]
        //контейнер, чтобы будущие под деревья создавать
        let subRectangles = [
            new Rectangle(this._boundary.x, this._boundary.y, this._boundary.w / 2, this._boundary.h / 2),
            new Rectangle(this._boundary.x + this._boundary.w / 2, this._boundary.y, this._boundary.w / 2, this._boundary.h / 2),
            new Rectangle(this._boundary.x, this._boundary.y + this._boundary.h / 2, this._boundary.w / 2, this._boundary.h / 2),
            new Rectangle(this._boundary.x + this._boundary.h / 2, this._boundary.y + this._boundary.h / 2, this._boundary.w / 2, this._boundary.h / 2),
        ]
        circleLoop1: for (let i = 0; i < container.circles.length; i++) {
            for (let j = 0; j < subRectangles.length; j++) {

                if (this.isInside(subRectangles[j], container.circles[i])) {
                    futureSubTree[j].circles.push(container.circles[i])
                    continue circleLoop1
                }
            }
            this._container.circles.push(container.circles[i])
        }

        triangleLoop1: for (let i = 0; i < container.triangle.length; i++) {
            for (let j = 0; j < subRectangles.length; j++) {

                if (this.isInside(subRectangles[j], container.triangle[i])) {
                    futureSubTree[j].triangle.push(container.triangle[i])
                    continue triangleLoop1
                }
            }
            this._container.triangle.push(container.triangle[i])
        }

        hexagonLoop1: for (let i = 0; i < container.hexagon.length; i++) {
            for (let j = 0; j < subRectangles.length; j++) {

                if (this.isInside(subRectangles[j], container.hexagon[i])) {
                    futureSubTree[j].hexagon.push(container.hexagon[i])
                    continue hexagonLoop1
                }
            }
            this._container.hexagon.push(container.hexagon[i])
        }
        for (let i = 0; i < futureSubTree.length; i++) {
            if (futureSubTree[i].circles.length + futureSubTree[i].triangle.length + futureSubTree[i].hexagon.length > 0) {
                let subTree = new QuadTree(subRectangles[i], this._capacity)
                subTree.buildTree(futureSubTree[i])
                this._children.push(subTree)
            }
        }

        this._hasChildren = this._children.length > 0
    }

    isInside(bound, shape) // помещаемся в границах
    {
        return bound.left <= shape.getLeft() && bound.right >= shape.getRight() && bound.top <= shape.getTop() && bound.bottom >= shape.getBottom()
    }

    calculateCollision(contactCallback)
    {
        this.fullInnerCircle(contactCallback)
        this.fullInnerPoly(contactCallback)
        for(let i = 0; i < this._container.circles.length; i++) {
            for(let j = 0 ;j < this._children.length; j++) {
                this._children[j].digCircle(contactCallback,this._container.circles[i])
            }
        }
        for(let i = 0; i < this._container.triangle.length; i++) {
            for(let j = 0 ;j < this._children.length; j++) {
                this._children[j].digPoly(contactCallback,this._container.triangle[i])
            }
        }
        for(let i = 0; i < this._container.hexagon.length; i++) {
            for(let j = 0 ;j < this._children.length; j++) {
                this._children[j].digPoly(contactCallback,this.hexagon.triangle[i])
            }
        }

        for(let i = 0; i < this._children.length; i++) {
            this._children[i].calculateCollision(contactCallback)
        }
    }

    fullInnerCircle(contactCallback)
    {
        for (let i = 0; i < this._container.circles.length; i++) {
            for (let j = i + 1; j < this._container.circles.length; j++) {
                if (this._container.circles[i].checkCollision(this._container.circles[j])) {
                    contactCallback(this._container.circles[i],this._container.circles[j])
                }
            }
            for (let j = 0; j < this._container.triangle.length; j++) {
                if(this._container.circles[i].checkCollision(this._container.triangle[j]) && checkCirclePolygonCollision(this._container.circles[i], this._container.triangle[j]))
                {
                    contactCallback(this._container.circles[i],this._container.triangle[j])
                }
            }
            for (let j = 0; j < this._container.hexagon.length; j++) {
                if(this._container.circles[i].checkCollision(this._container.hexagon[j]) && checkCirclePolygonCollision(this._container.circles[i], this._container.hexagon[j]))
                {
                    contactCallback(this._container.circles[i],this._container.hexagon[j])
                }
            }

        }
    }

    fullInnerPoly(contactCallback) {
        for(let i = 0; i < this._container.triangle.length; i++) {
            for(let j = i+1; j < this._container.triangle.length; j++) {
                if(this._container.triangle[i].checkCollision(this._container.triangle[j]) && checkPolygonCollision(this._container.triangle[i], this._container.triangle[j]))
                {
                    contactCallback(this._container.triangle[i],this._container.triangle[j])
                }
            }
            for (let j = 0; j < this._container.hexagon.length; j++) {
                if(this._container.triangle[i].checkCollision(this._container.hexagon[j]) && checkPolygonCollision(this._container.triangle[i], this._container.hexagon[j]))
                {
                    contactCallback(this._container.triangle[i],this._container.hexagon[j])
                }
            }
        }

        for(let i = 0; i < this._container.hexagon.length; i++) {
            for(let j = i+1; j < this._container.hexagon.length; j++) {
                if(this._container.hexagon[i].checkCollision(this._container.hexagon[j]) && checkPolygonCollision(this._container.hexagon[i], this._container.hexagon[j]))
                {
                    contactCallback(this._container.hexagon[i],this._container.hexagon[j])
                }
            }
        }
    }
    
    digCircle(contactCallback, circle)
    {
        for (let j = 0; j < this._container.circles.length; j++) {
            if (circle.checkCollision(this._container.circles[j])) {
                contactCallback(circle,this._container.circles[j])
            }
        }
        for (let j = 0; j < this._container.triangle.length; j++) {
            if(circle.checkCollision(this._container.triangle[j]) && checkCirclePolygonCollision(circle, this._container.triangle[j]))
            {
                contactCallback(circle,this._container.triangle[j])
            }
        }
        for (let j = 0; j < this._container.hexagon.length; j++) {
            if(circle.checkCollision(this._container.hexagon[j]) && checkCirclePolygonCollision(circle, this._container.hexagon[j]))
            {
                contactCallback(circle,this._container.hexagon[j])
            }
        }
        for(let j = 0 ;j < this._children.length; j++) {
            this._children[j].digCircle(contactCallback,circle)
        }


    }


    digPoly(contactCallback, poly)
    {
        for (let j = 0; j < this._container.circles.length; j++) {
            if (poly.checkCollision(this._container.circles[j]) && checkCirclePolygonCollision(this._container.circles[j],poly )) {
                contactCallback(poly,this._container.circles[j])
            }
        }
        for (let j = 0; j < this._container.triangle.length; j++) {
            if(poly.checkCollision(this._container.triangle[j]) && checkPolygonCollision(poly, this._container.triangle[j]))
            {
                contactCallback(poly,this._container.triangle[j])
            }
        }
        for (let j = 0; j < this._container.hexagon.length; j++) {
            if(poly.checkCollision(this._container.hexagon[j]) && checkPolygonCollision(poly, this._container.hexagon[j]))
            {
                contactCallback(poly,this._container.hexagon[j])
            }
        }

        for(let j = 0 ;j < this._children.length; j++) {
            this._children[j].digPoly(contactCallback,poly)
        }
    }


}
