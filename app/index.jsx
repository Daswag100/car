import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Add a small delay to ensure the navigation system is ready
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Return a minimal view while redirecting
  return <View style={{ flex: 1, backgroundColor: '#f9f9fa' }} />;
}