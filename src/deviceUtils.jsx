// src/utils/deviceUtils.jsx
import { Preferences } from '@capacitor/preferences';
import { Dialog } from '@capacitor/dialog';
import { Capacitor } from '@capacitor/core';



export const checkStoragePermission = async () => {
  if (!Capacitor.isNativePlatform()) return true;
  
  try {
    const { value } = await Preferences.get({ key: 'storagePermission' });
    if (value === 'granted') return true;
    
    const { value: dialogResult } = await Dialog.confirm({
      title: 'Storage Permission',
      message: 'This app needs storage access to save certificates and other files.',
      okButtonTitle: 'Allow',
      cancelButtonTitle: 'Deny',
    });

    if (dialogResult) {
      await Preferences.set({ key: 'storagePermission', value: 'granted' });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking storage permission:', error);
    return false;
  }
};