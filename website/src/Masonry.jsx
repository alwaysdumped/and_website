// src/Masonry.jsx
import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';

export default function ImageMasonry({ items, onItemClick = () => {} }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <Box sx={{ width: 'auto', minHeight: 400 }}>
      <Masonry columns={{ xs: 1, sm: 2, md: 4, lg: 5 }} spacing={1}>
        {items.map((item, index) => (
          <Box
            key={item.id}
            onClick={() => onItemClick(item, index)} // MODIFIED: Added onClick handler
            sx={{
              cursor: 'pointer', // MODIFIED: Added pointer cursor
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(0.97)',
              },
            }}
          >
            <img
              src={item.img}
              alt={item.alt}
              loading="lazy"
              style={{
                display: 'block',
                width: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>
        ))}
      </Masonry>
    </Box>
  );
}