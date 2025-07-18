import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { useGetRecipeSubCategoryByIdMutation } from '../../../features/api/subCategoryApi';
import { useState, useEffect } from 'react';

const ViewSubCategoryDialog = ({ open, onClose, subCategoryId }) => {
  const [getSubCategoryById, { isLoading }] = useGetRecipeSubCategoryByIdMutation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (subCategoryId && open) {
        try {
          const result = await getSubCategoryById({ subCategoryId }).unwrap();
          setData(result.data);
        } catch (error) {
          console.error('Failed to fetch sub-category:', error);
          setData(null);
        }
      }
    };

    fetchData();
  }, [subCategoryId, open, getSubCategoryById]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle>Sub-Category Details</DialogTitle>
              <DialogContent dividers className="custom-scrollbar max-h-[500px]">
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight={120}>
            <CircularProgress color="warning" />
          </Box>
        ) : !data ? (
          <Typography color="textSecondary" align="center">
            No data found.
          </Typography>
        ) : (
          <Box display="flex" flexDirection="column" gap={2}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1">{data.name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Category
              </Typography>
              <Typography variant="body1">{data.category_name}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Description
              </Typography>
              <Typography variant="body1">{data.description}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Image
              </Typography>
              {data.image ? (
                <img
                  src={data.image}
                  alt={data.name}
                  className="w-30 h-30 object-cover rounded-lg mt-2"
                />
              ) : (
                <Typography color="textSecondary">No Image</Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="warning" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewSubCategoryDialog;