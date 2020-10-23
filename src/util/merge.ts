export default function merge<U>(
  ...objects: [U | Partial<U>, ...Partial<U>[]]
) {
  const mergedObj = {} as U;
  for (let obj of objects) {
    Object.assign(mergedObj, obj);
  }
  return mergedObj;
}
