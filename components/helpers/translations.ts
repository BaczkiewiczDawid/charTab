const translationsList: { [key: string]: string } = {
  id: "Id",
  name: "Nazwa",
  age: "Wiek",
  position: "Stanowisko",
  salary: "Pensja",
}

export const translate = (nameToTranslate: string): string => {
  return translationsList[nameToTranslate] || "Translation not found";
}