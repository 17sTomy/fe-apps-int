import * as React from 'react';
import { motion } from 'framer-motion';

export const ImageModifier = ({ item }) => {
  const handleEdition = () => {
    console.warn('Acá editaría');
  };

  return (
    <motion.img
      whileHover={{
        scale: 1.05,
      }}
      transition={{ duration: 0.7 }}
      src={item.url}
      alt={item.url}
      style={{
        width: '100%',
        maxHeight: '400px',
        objectFit: 'cover',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    />
  );
};
