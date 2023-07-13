export const transpose = <T>(array: T[][]) => {
  const transposedArray: T[][] = [];

  // TODO: check shape
  const initialRowLength = array[0].length;
  const initialColumnLength = array.length;

  for (let row = 0; row < initialRowLength; ++row) {
    const newRows: T[] = [];
    for (let column = 0; column < initialColumnLength; ++column) {
      const value = array[column][row];
      newRows.push(value);
    }

    transposedArray.push(newRows);
  }

  return transposedArray;
};
