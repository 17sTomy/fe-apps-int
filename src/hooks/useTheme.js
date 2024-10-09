import { lightTheme, darkTheme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slice/themeSlice';
import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  const themeStore = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (themeStore.theme.name === 'dark') dispatch(setTheme(lightTheme));
    else dispatch(setTheme(darkTheme));
  };

  const materialTheme = createTheme({
    palette: {
      mode: themeStore.theme.name,
      primary: {
        main: '#0081c6',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  return {
    toggleTheme,
    theme: themeStore.theme,
    materialTheme,
  };
};
