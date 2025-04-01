import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'red'
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen name="index" options={{ title: 'home' }} />
      <Stack.Screen name="dashboard" options={{ title: 'dashboard' }} />
      <Stack.Screen name="profile" options={{ title: 'Perfil' }} />
    </Stack>
  );
}
