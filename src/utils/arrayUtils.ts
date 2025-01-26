export const moveItemForward = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index !== -1 && index < equation.length - 1) {
    const newItems = [...equation];
    [newItems[index], newItems[index + 1]] = [
      newItems[index + 1],
      newItems[index],
    ];
    setEquation(newItems);
  }
};

export const moveItemBackward = (
  equation: string[],
  setEquation: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const index = equation.indexOf("curser@547788");
  if (index !== -1 && index > 0) {
    const newItems = [...equation];
    [newItems[index], newItems[index - 1]] = [
      newItems[index - 1],
      newItems[index],
    ];
    setEquation(newItems);
  }
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
