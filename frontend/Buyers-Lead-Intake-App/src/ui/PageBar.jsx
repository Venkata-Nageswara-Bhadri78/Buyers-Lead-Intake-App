import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PageBar({ pageBarNumber, pageNumber, setPageNumber }) {
  const handleChange = (event, value) => {
    setPageNumber(value); 
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageBarNumber===10 ? pageNumber+1 : pageNumber}            
        page={pageNumber}     
        onChange={handleChange} 
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}
