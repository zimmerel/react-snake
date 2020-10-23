import { GameSettings, InitialGameSettings, AnySettings } from "../types";
import {
  getRandomPosition,
  Direction,
  Position,
  nextPosition,
  keepInBounds,
  eqPosition,
  reverseDirection,
  getRandomDirection
} from "../util/position";
import { merge } from "../util";

function getCorePosition(boardSize: number, occupiedSpaces: Position[]) {
  let position: Position | null = null;
  while (!position) {
    position = getRandomPosition(1, boardSize);
    for (let pos of occupiedSpaces) {
      if (eqPosition(pos, position as Position)) {
        position = null;
      }
    }
  }
  return position;
}

function initializeQueue(position: Position, direction: Direction) {
  const midPosition = nextPosition(position, direction);
  const headPosition = nextPosition(midPosition, direction);
  return [headPosition, midPosition, position];
}

export function getDefaultState(): GameSettings {
  const boardSize = 30;
  const direction = getRandomDirection();
  const snakeQueue = initializeQueue(
    getRandomPosition(3, boardSize + 3),
    direction
  );
  return {
    acceleration: 1,
    boardSize,
    direction,
    score: 0,
    size: 3,
    speed: 3,
    gameState: "IDLE",
    snakeQueue: snakeQueue,
    corePosition: getCorePosition(boardSize, snakeQueue),
    boost: 0
  };
}

export const defaultState = getDefaultState();

export interface InitGameAction {
  type: "INIT_GAME";
  initialState: InitialGameSettings;
}

export function initializeGame(initialState?: AnySettings): GameSettings {
  const state = merge(getDefaultState(), initialState || {});
  const snakeQueue = initializeQueue(
    getRandomPosition(3, state.boardSize - 3),
    state.direction
  );
  return merge(state, {
    snakeQueue,
    corePosition: getCorePosition(state.boardSize, snakeQueue)
  });
}

export function initializeGameAction(
  state: GameSettings,
  action: InitGameAction
) {
  return initializeGame(action.initialState);
}

export interface TurnAction {
  type: "TURN";
  direction: Direction;
}

export function turnAction(state: GameSettings, action: TurnAction) {
  if (action.direction === state.direction) {
    // TODO Leaving this here to add boost later
    return state;
  } else if (action.direction === reverseDirection(state.direction)) {
    return state;
  }
  return merge(state, { direction: action.direction });
}

export interface ConsumeAction {
  type: "CONSUME";
}

export function consumeAction(state: GameSettings) {
  const {
    score,
    size,
    speed,
    acceleration,
    boardSize,
    snakeQueue,
    direction
  } = state;
  const newSnakeQueue = [nextPosition(snakeQueue[0], direction), ...snakeQueue];
  return merge(state, {
    score: score + 1,
    size: size + 1,
    speed: speed + acceleration,
    corePosition: getCorePosition(boardSize, newSnakeQueue),
    snakeQueue: newSnakeQueue
  });
}

export interface PauseAction {
  type: "PAUSE";
}

export function pauseGameAction(state: GameSettings, action: PauseAction) {
  return merge(state, { gameState: "IDLE" });
}

export interface PlayAction {
  type: "PLAY";
}

export function playGameAction(state: GameSettings, action: PlayAction) {
  return merge(state, { gameState: "PLAYING" });
}

export interface MoveAction {
  type: "MOVE";
}

export function moveSnake(state: GameSettings) {
  const min = 0;
  const max = state.boardSize;
  const nextPos = keepInBounds(
    nextPosition(state.snakeQueue[0], state.direction),
    min,
    max
  );

  if (eqPosition(nextPos, state.corePosition)) {
    return consumeAction(state);
  }

  const gameState = merge(state, {
    snakeQueue: [nextPos, ...state.snakeQueue.slice(0, -1)]
  });
  return gameState;
}

export interface LoseGameAction {
  type: "LOSE";
}

export function loseGameAction(state: GameSettings, action?: LoseGameAction) {
  return initializeGame({ gameState: "LOST" });
}

export interface BoostAction {
  type: "BOOST";
  amount: number;
}

export function accelerateAction(state: GameSettings, action: BoostAction) {
  return merge(state, { boost: action.amount });
}

export type GameAction =
  | InitGameAction
  | TurnAction
  | ConsumeAction
  | PauseAction
  | PlayAction
  | MoveAction
  | LoseGameAction
  | BoostAction;
