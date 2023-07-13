export const transpose = <T>(array: T[][]) => {
  const transposedArray: T[][] = [];

  for (let row = 0; row < array[0].length; ++row) {
    const newRows: T[] = [];
    for (let column = 0; column < array.length; ++column) {
      const value = array[column][row];
      newRows.push(value);
    }

    transposedArray.push(newRows);
  }

  return transposedArray;
};
