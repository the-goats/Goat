function timeFunction(fn, string) {
  console.time(string);
  fn();
  console.timeEnd(string);
}

module.exports = timeFunction;
