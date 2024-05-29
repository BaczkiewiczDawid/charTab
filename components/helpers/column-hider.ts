export const columnHider = (data: any, columnsToHide: string[]) => {
  const newData = data.map((el: any) => {
    columnsToHide.map((columnName) => {
      delete el[columnName]
    })

    return el
  })

  return newData
}