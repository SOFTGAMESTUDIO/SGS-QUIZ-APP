// src/utils/backButtonHandler.jsx
import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';
import { useNavigate, useLocation } from 'react-router-dom';

export const useBackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const backHandler = () => {
    if (location.pathname === '/') {
      // Show exit confirmation on home page
      if (window.confirm('Are you sure you want to exit?')) {
        if (Capacitor.isNativePlatform()) {
          CapacitorApp.exitApp();
        } else {
          window.close(); // For web, may not work due to browser restrictions
        }
      }
    } else {
      // Go back one step for other pages
      navigate(-1);
    }
  };

  useEffect(() => {
    // Add back button listener for Capacitor
    if (Capacitor.isNativePlatform()) {
      const backButtonListener = CapacitorApp.addListener('backButton', backHandler);
  
      return () => {
        backButtonListener.remove();
      };
    }
  }, [backHandler, location.pathname]);

  return backHandler;
};