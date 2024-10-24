import * as React from 'react';
import { motion } from 'framer-motion';

export const ImageModifier = ({ item }) => {
  const handleEdition = () => {
    console.warn('Acá editaría');
  };

  return (
    <motion.img
      transition={{ duration: 0.7 }}
      src={item.url}
      alt={item.url}
      style={{
        width: '100%',
        height: '400px',
        objectFit: 'contain',
        borderRadius: '10px',
        cursor: 'pointer',
      }}
    />
  );
};
