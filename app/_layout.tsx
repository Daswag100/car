import { Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  // Ensure the layout is fully mounted before any navigation
  useEffect(() => {
    // This ensures the layout is ready
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index"
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="(tabs)" 
        options={{ 
          headerShown: false,
        }} 
      />
    </Stack>
  );
}