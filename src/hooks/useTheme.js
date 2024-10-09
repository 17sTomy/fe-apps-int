import React, { useState } from 'react';
import { lightTheme, darkTheme } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../store/slice/themeSlice';

export const useTheme = () => {
  const themeStore = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (themeStore.theme.name === 'dark') dispatch(setTheme(lightTheme));
    else dispatch(setTheme(darkTheme));
  };

  return {
    toggleTheme,
    theme: themeStore.theme,
  };
};
