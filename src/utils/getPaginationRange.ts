const getPaginationRange = (current: number, total: number, delta = 2) => {
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let last: number | null = null;

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || // first
      i === total || // last
      (i >= current - delta && i <= current + delta) // window
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (last) {
      if ((i as number) - last === 2) {
        rangeWithDots.push(last + 1);
      } else if ((i as number) - last > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    last = i as number;
  }

  return rangeWithDots;
};

export default getPaginationRange;