import './CustomBox.styles.scss';
import '../../../animations/CardAnimationBlue.scss';

import { useTheme } from '../../../hooks/useTheme';
import { motion } from 'framer-motion';

const reflectionName = {
  blue: 'card-animation',
  cian: 'card-animation-cian',
  yellow: 'card-animation-yellow',
  green: 'card-animation-green',
  red: 'card-animation-red',
};

export const CustomBox = ({
  onClick = () => {},
  width = 150,
  height = 150,
  background,
  color,
  animate = false,
  reflectionColor = 'blue',
  children,
}) => {
  const { theme } = useTheme();

  return (
    <motion.div
      onClick={onClick}
      className="custom-box-outer"
      variants={{
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      }}
      initial={animate && 'hidden'}
      whileHover={{ scale: 1.1 }}
      animate={animate && 'visible'}
      style={{
        width,
        height,
        background: background ?? theme.accent,
        animation: animate && `${reflectionName[reflectionColor]} 6s linear infinite forwards`,
        color: (color ?? theme.name === 'light') ? theme.primary : theme.secondary,
      }}>
      {children}
    </motion.div>
  );
};
