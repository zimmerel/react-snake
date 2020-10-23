import { Direction, Position } from "./util/position";

export type GameState = "IDLE" | "PLAYING" | "WON" | "LOST";

export interface GameSettings {
  acceleration: number;
  corePosition: Position;
  boardSize: number;
  direction: Direction;
  score: number;
  size: number;
  snakeQueue: Position[];
  speed: number;
  gameState: GameState;
  boost: number;
}

export type AnySettings = Partial<GameSettings>;
type ConfigurableSettings = "size" | "boardSize" | "direction";

export type InitialGameSettings = Pick<AnySettings, ConfigurableSettings>;
