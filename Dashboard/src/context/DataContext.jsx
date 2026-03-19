import React, { createContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [rawDataset, setRawDataset] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load final results
        const response = await fetch('/data/final_results.csv');
        if (!response.ok) throw new Error('Failed to fetch final_results.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            
            // Optionally load raw dataset for specific stats
            fetch('/data/fake_review_dataset.csv')
              .then(res => res.text())
              .then(rawText => {
                Papa.parse(rawText, {
                  header: true,
                  dynamicTyping: true,
                  skipEmptyLines: true,
                  complete: (rawResults) => {
                    setRawDataset(rawResults.data);
                    setLoading(false);
                  }
                });
              })
              .catch(err => {
                console.warn('Raw dataset load failed, proceeding with results only.', err);
                setLoading(false);
              });
          },
          error: (err) => {
            setError(err.message);
            setLoading(false);
          }
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, rawDataset, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
