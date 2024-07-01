export const sortKeysByOrder = (keys: string[], order: string[]) => {
  return keys.sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    return (indexA === -1 ? order.length : indexA) - (indexB === -1 ? order.length : indexB);
  });
};

export const sortDataByOrder = (data: any, order: string[]) => {
  return data.map((item: any) => {
    const sortedKeys = sortKeysByOrder(Object.keys(item), order);
    let sortedItem = {};
    sortedKeys.forEach((key) => {
      //@ts-ignore
      sortedItem[key] = item[key];
    });
    return sortedItem;
  });
};