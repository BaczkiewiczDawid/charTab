import {useEffect} from 'react';
import axios from 'axios';
import {useTableContext} from "@/context/table-context";

export const updateCellTypes = () => {
  const {
    cellsType,
    selectedTableID,
  } = useTableContext();

  useEffect(() => {
    if (selectedTableID) {
      const saveCellTypes = async () => {
        try {
          await axios.post('/api/save-cell-types', {cellsType, selectedTableID});
        } catch (error) {
          console.error('Error saving cell types:', error);
        }
      };

      if (Object.keys(cellsType).length > 0) {
        saveCellTypes();
      }
    }
  }, [cellsType]);
};