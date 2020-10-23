import { randomInt } from "./random";
export type Position = [number, number];

const directionMap: { [k: string]: Position } = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, -1],
  down: [0, 1]
};

const directionReverseMap = {
  left: "right",
  right: "left",
  up: "down",
  down: "up"
};

const directions = ["left", "right", "down", "up"] as const;

export type Direction = keyof typeof directionMap;
export type DirectionStep = typeof directionMap[Direction];

export function getRandomDirection(): Direction {
  const index = randomInt(0, directions.length);
  return directions[index];
}

export function step(direction: Direction): Position {
  return directionMap[direction];
}

export function reverseDirection(direction: Direction): Direction {
  return directionReverseMap[direction];
}

export function reverseStep(direction: Direction): Position {
  return directionMap[directionReverseMap[direction]];
}

export function getRandomPosition(min: number, max: number): Position {
  return [randomInt(min, max), randomInt(min, max)];
}

export function nextPosition([x, y]: Position, direction: Direction): Position {
  const [stepX, stepY] = step(direction);
  return [x + stepX, y + stepY];
}

export function keepInBounds(
  pos: Position,
  min: number,
  max: number
): Position {
  return pos.map((coord) => {
    if (coord > max) {
      return min;
    } else if (coord <= min) {
      return max;
    }
    return coord;
  }) as Position;
}

export function eqPosition(a: Position, b: Position): boolean {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

export function hasIntersect([head, ...tail]: Position[]) {
  for (let pos of tail) {
    if (eqPosition(pos, head)) {
      return true;
    }
  }
  return false;
}
