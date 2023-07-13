export const transpose = <T>(array: T[][]) => {
  const transposedArray: T[][] = [];

  for (let r = 0; r < array[0].length; ++r) {
    const newRows: T[] = [];
    for (let c = 0; c < array.length; ++c) {
      const value = array[c][r];
      newRows.push(value);
    }

    transposedArray.push(newRows);
  }

  return transposedArray;
};
