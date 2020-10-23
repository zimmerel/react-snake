export function randomInt(min: number = 0, max: number = 10) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function makeIterator<T>(func: () => T) {
  return {
    get next(): T {
      return func();
    }
  };
}

export function intRandomizer(min: number, max: number) {
  return makeIterator(() => randomInt(min, max));
}
