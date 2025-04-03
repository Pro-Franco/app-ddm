import { View, Text, Button } from 'react-native';
import { Link, Redirect, router } from 'expo-router';
function irConfigura() {
  router.push('/settings');
}
export default function Home() {
  return (
    <View>
      <Text> Pagina home</Text>
      <Link href={'/profile'}> ir para Profile</Link>
      <Link href={'/settings'}> ir para Configuracoes</Link>
      <Link href={'(tabs)'}> ir para tabs</Link>
      <Button title="ir Configurações" onPress={irConfigura} />
    </View>
  );
}
