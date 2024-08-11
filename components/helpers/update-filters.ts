import {useEffect} from 'react';
import axios from 'axios';
import {useTableContext} from "@/context/table-context";

export const updateFilters = () => {
  const {
    filters,
    selectedTableID,
  } = useTableContext();

  useEffect(() => {
    if (selectedTableID) {
      const saveFilters = async () => {
        try {
          await axios.post('/api/save-filters', {filters, selectedTableID});
        } catch (error) {
          console.error('Error saving filters:', error);
        }
      };

      if (Object.keys(filters).length > 0) {
        saveFilters();
      }
    }
  }, [filters]);
};