import { lightTheme, darkTheme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slice/themeSlice';
import { createTheme } from '@mui/material/styles';
import { updateTheme } from '../services/customerService';

export const useTheme = () => {
  const themeStore = useSelector((state) => state.theme);
  const accountStore = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const toggleTheme = async () => {
    const newTheme = themeStore.theme.name === 'dark' ? lightTheme : darkTheme;

    if (accountStore.authenticated) {
      try {
        await updateTheme({ theme: newTheme.name?.toUpperCase() });
      } catch (e) {
        console.error(e);
      }
    }
    dispatch(setTheme(newTheme));
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
