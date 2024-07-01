export const columnHider = (data: any, columnsToHide: string[]) => {
  const newData = data.map((el: any) => {
    const newEl = { ...el }

    columnsToHide.forEach((columnName) => {
      delete newEl[columnName]
    });

    return newEl
  });

  return newData
}
