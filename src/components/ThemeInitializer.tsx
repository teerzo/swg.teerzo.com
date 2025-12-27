'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../theme-provider';

export default function ThemeInitializer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // First effect to handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Second effect to handle theme initialization only once
  useEffect(() => {
    if (!mounted || initialized) return;
    
    try {
      // Get the saved theme from localStorage
      const savedTheme = localStorage.getItem('swg-tools-theme');
      
      // Only set the theme if it's different from the current theme
      if (savedTheme && savedTheme !== theme) {
        setTheme(savedTheme as any);
      }
      
      // Mark as initialized to prevent further updates
      setInitialized(true);
    } catch (error) {
      console.error('Error initializing theme:', error);
      setInitialized(true);
    }
  }, [mounted, initialized, theme, setTheme]);

  // Separate effect to apply the theme to the HTML element
  useEffect(() => {
    if (!mounted) return;
    
    try {
      // Apply the theme to the HTML element
      document.documentElement.setAttribute('data-theme', theme || 'imperial');
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [mounted, theme]);

  // This component doesn't render anything
  return null;
} 