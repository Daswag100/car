import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

// Custom Vehicle Icon Component
function VehicleIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <Image
      source={require('@/assets/images/vehicle.png')}
      style={{
        width: 24,
        height: 24,
        tintColor: color,
      }}
      resizeMode="contain"
    />
  );
}

// Custom Branches Icon Component  
function BranchesIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <FontAwesome 
      name="map-marker" 
      size={24} 
      color={color}
    />
  );
}

// Custom Account Icon Component
function AccountIcon({ color, focused }: { color: string; focused: boolean }) {
  return (
    <FontAwesome 
      name="user" 
      size={24} 
      color={color}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6', // Blue color for active tab
        tabBarInactiveTintColor: '#9CA3AF', // Gray color for inactive tab
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 75,
          paddingBottom: 16,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: useClientOnlyValue(false, true),
      }}>
      
      <Tabs.Screen
        name="branches"
        options={{
          title: 'Branches',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <BranchesIcon color={color} focused={focused} />,
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Vehicles',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <VehicleIcon color={color} focused={focused} />,
        }}
      />
      
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => <AccountIcon color={color} focused={focused} />,
        }}
      />
    </Tabs>
  );
}