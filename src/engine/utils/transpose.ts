export const transpose = (array: any[][]) => {
  const transposedArray: any[][] = [];

  for (let r = 0; r < array[0].length; ++r) {
    const newRows = [];
    for (let c = 0; c < array.length; ++c) {
      const value = array[c][r];
      if (value === undefined) continue;
      newRows.push(value);
    }
    transposedArray.push(newRows);
  }

  return transposedArray;
};
