export const moveItemForward = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index !== -1) {
    const newItems = [...equation];
    if (newItems[index + 1]?.includes("}")) {
      const [beforeCursor, afterCursor] = splitAt(newItems[index + 1], 1);
      newItems[index + 1] = afterCursor;
      newItems.splice(index, 0, beforeCursor);
    } else if (index < newItems.length - 1) {
      [newItems[index], newItems[index + 1]] = [
        newItems[index + 1],
        newItems[index],
      ];
    }

    setEquation(newItems);
  }
};

export const moveItemBackward = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index !== -1) {
    const newItems = [...equation];

    if (newItems[index - 1]?.includes("{")) {
      const [beforeCursor, afterCursor] = splitAt(
        newItems[index - 1],
        newItems[index - 1].length - 1
      );
      newItems[index - 1] = beforeCursor;
      newItems.splice(index, 0, afterCursor);
    } else if (index > 0) {
      [newItems[index], newItems[index - 1]] = [
        newItems[index - 1],
        newItems[index],
      ];
    }

    setEquation(newItems);
  }
};

const splitAt = (text: string, index: number): [string, string] => {
  return [text.slice(0, index), text.slice(index)];
};

export const addToEquation = (
  value: string,
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index !== -1) {
    const newEquation = [...equation];
    newEquation.splice(index, 0, value);
    setEquation(newEquation);
  }
};

export const deleteFromEquation = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index > 0) {
    const newEquation = [...equation];
    newEquation.splice(index - 1, 1);
    setEquation(newEquation);
  }
};
