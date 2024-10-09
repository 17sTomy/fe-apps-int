import { createSlice } from '@reduxjs/toolkit';
import { darkTheme, lightTheme } from '../../theme';

const setupTheme = () => {
  const themeName = localStorage.getItem('theme');
  if (!themeName) return darkTheme;

  if (themeName === 'dark') return darkTheme;
  return lightTheme;
};

const initialState = {
  theme: setupTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme.name);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
