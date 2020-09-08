import * as Haptics from 'expo-haptics';

export const selectionTouch = () => Haptics.selectionAsync();
export const notificationTouch = (type: 'Success' | 'Warning' | 'Error') =>
  Haptics.notificationAsync(Haptics.NotificationFeedbackType[type]);
export const impactTouch = (type: 'Light' | 'Medium' | 'Heavy') =>
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle[type]);