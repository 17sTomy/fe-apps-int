import { motion } from 'framer-motion';

export const AnimatedView = ({
  props,
  orientation = 'vertical',
  direction = 'normal',
  duration = 0.6,
  children,
}) => {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          x: orientation === 'horizontal' ? (direction === 'normal' ? -80 : 80) : 0,
          y: orientation === 'horizontal' ? 0 : direction === 'normal' ? -80 : 80,
        },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration: duration }}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
};
