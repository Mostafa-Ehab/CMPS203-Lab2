/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  constructor(coordX, coordY) {
    this.coordX = coordX;
    this.coordY = coordY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width or height");
    }

    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;

    this.isSquare = width == height;
  }

  set Height(height) {
    if (!height || height <= 0) {
      throw Error("Invalid height");
    }
    this.height = height;

    // Change case of square
    if (this.isSquare) {
      this.Width = height;
    }
  }

  get Height() {
    return this.height;
  }

  set Width(width) {
    if (!width || width <= 0) {
      throw Error("Invalid width");
    }
    this.width = width;

    // Change case of square
    if (this.isSquare) {
      this.Height = width;
    }
  }

  get Width() {
    return this.width;
  }

  get Area() {
    return this.width * this.height;
  }

  get Perimeter() {
    return 2 * (this.width + this.height);
  }

  set StartingPoint(point) {
    this.startingPoint = point;
  }

  get StartingPoint() {
    return this.startingPoint;
  }

  printEndPoint() {
    const topRight = this.startingPoint.coordX + this.width;
    const bottomLeft = this.startingPoint.coordY + this.height;
    console.log(`End Point X-Axis (Top Right): ${topRight}`);
    console.log(`End Point Y-Axis (Bottom Left): ${bottomLeft}`);
  }
}

function createRectangle(x, y, width, height) {
  const startingPoint = new Point(x, y)
  return new Rectangle(startingPoint, width, height)
}

function createSquare(x, y, height) {
  const startingPoint = new Point(x, y)
  return new Rectangle(startingPoint, height, height)
}

const sq = createSquare(2, 3, 4);
console.log(sq.Perimeter);
sq.printEndPoint();

const myRect = createRectangle(2, 3, 5, 4);
console.log(`Rectangle perimeter before setting height: ${myRect.Perimeter}`)
myRect.Height = 3
console.log(`Rectangle perimeter after setting height: ${myRect.Perimeter}`)
