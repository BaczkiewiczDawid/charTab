import { TableCell } from "@/components/ui/table";
import { ReactNode } from "react";
import { useTableContext } from "@/context/table-context";
import { Data } from "@/types/data";

type Props = {
  key?: number;
  name?: string | number | boolean;
  children?: ReactNode;
  colName?: string;
};

export const Cell = ({ key, name, children, colName }: Props) => {
  const { columnsToColor, dataToRender } = useTableContext();

  const toColor: boolean = !!(colName && columnsToColor.includes(colName));

  let values: number[] = [];

  if (toColor && colName) {
    dataToRender.forEach((data: Data) => {
      if (typeof data[colName] === "number") {
        values.push(data[colName] as number);
      }
    });
  }

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const midValue = (minValue + maxValue) / 2;

  const findClosest = (value: number, num1: number, num2: number, num3: number) => {
    const differences = [Math.abs(value - num1), Math.abs(value - num2), Math.abs(value - num3)];
    const minDifference = Math.min(...differences);
    const closestIndex = differences.indexOf(minDifference);
    const closestValue = [num1, num2, num3][closestIndex];
    return closestValue;
  };

  //@ts-ignore
  const nearestValue = findClosest(name, minValue, midValue, maxValue);

  let colorClass;

  switch (nearestValue) {
    case minValue:
      colorClass = "bg-cellGreen";
      break;
    case midValue:
      colorClass = "bg-cellYellow";
      break;
    case maxValue:
      colorClass = "bg-cellRed";
      break;
    default:
      colorClass = "bg-cellRed";
      break;
  }

  return (
    <TableCell key={key} className={`border border-gray-600 text-start w-auto ${toColor && colorClass}`}>
      {children}
      {name}
    </TableCell>
  );
};
