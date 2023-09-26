export default function randomMinMaxNot(min, max, not) {
  let result = Math.round(Math.random() * (max - min) + min);
  while (result === not) {
    result = Math.round(Math.random() * (max - min) + min);
  }
  return result;
}
