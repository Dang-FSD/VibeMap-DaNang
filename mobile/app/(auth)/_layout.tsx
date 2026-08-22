import React from 'react';
import { Tabs } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <Tabs screenOptions={{
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      headerShadowVisible: false,
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        backgroundColor: '#ffffff',
      },
      tabBarActiveTintColor: '#0ea5e9',
      tabBarInactiveTintColor: '#94a3b8',
      headerRight: () => (
        <TouchableOpacity onPress={handleLogout} style={{ marginRight: 16 }}>
          <Text style={{ color: '#ef4444', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      )
    }}>
      <Tabs.Screen 
        name="dashboard" 
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen 
        name="planner" 
        options={{
          title: 'AI Planner',
          tabBarLabel: 'Planner',
        }}
      />
      <Tabs.Screen 
        name="trips" 
        options={{
          title: 'My Trips',
          tabBarLabel: 'Trips',
        }}
      />
    </Tabs>
  );
}
