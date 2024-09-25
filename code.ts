// Grid class (Composite Pattern)
class Grid {
  private grid: boolean[][];
  private obstacles: Point[];

  constructor(width: number, height: number, obstacles: Point[]) {
    this.grid = new Array(height).fill(new Array(width).fill(false));
    this.obstacles = obstacles;
    this.obstacles.forEach((obstacle) => {
      this.grid[obstacle.y][obstacle.x] = true;
    });
  }

  isObstacle(x: number, y: number): boolean {
    return this.grid[y][x];
  }
}

// Point class
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

// Direction enum
enum Direction {
  North,
  East,
  South,
  West,
}

// Rover class
class Rover {
  private position: Point;
  private direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.position = new Point(x, y);
    this.direction = direction;
  }

  moveForward(grid: Grid): boolean {
    const newPosition = this.getNextPosition();
    if (grid.isObstacle(newPosition.x, newPosition.y)) {
      return false; // Obstacle detected
    }
    this.position = newPosition;
    return true;
  }

  turnLeft() {
    this.direction = (this.direction - 1 + 4) % 4;
  }

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  getStatus(): string {
    return `Rover is at (${this.position.x}, ${this.position.y}) facing ${
      Direction[this.direction]
    }`;
  }

  private getNextPosition(): Point {
    switch (this.direction) {
      case Direction.North:
        return new Point(this.position.x, this.position.y - 1);
      case Direction.East:
        return new Point(this.position.x + 1, this.position.y);
      case Direction.South:
        return new Point(this.position.x, this.position.y + 1);
      case Direction.West:
        return new Point(this.position.x - 1, this.position.y);
    }
  }
}

// Command interface (Command Pattern)
interface Command {
  execute(rover: Rover, grid: Grid): boolean;
}

// MoveForwardCommand class
class MoveForwardCommand implements Command {
  execute(rover: Rover, grid: Grid): boolean {
    return rover.moveForward(grid);
  }
}

// TurnLeftCommand class
class TurnLeftCommand implements Command {
  execute(rover: Rover, grid: Grid): boolean {
    rover.turnLeft();
    return true;
  }
}

// TurnRightCommand class
class TurnRightCommand implements Command {
  execute(rover: Rover, grid: Grid): boolean {
    rover.turnRight();
    return true;
  }
}

// Main function
function main() {
  const grid = new Grid(10, 10, [(2, 2), (3, 5)]);
  const rover = new Rover(0, 0, Direction.North);

  const commands: Command[] = [
    new MoveForwardCommand(),
    new MoveForwardCommand(),
    new TurnRightCommand(),
    new MoveForwardCommand(),
    new TurnLeftCommand(),
    new MoveForwardCommand(),
  ];

  commands.forEach((command) => {
    command.execute(rover, grid);
  });

  console.log(rover.getStatus());
}

main();
