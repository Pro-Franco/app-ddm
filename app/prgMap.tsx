import { Text, View, StyleSheet, Image, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { Welcome } from '@/components/welcome';
import PlacarFutebol from '@/components/placarFutebol';
import Curtidas from '@/components/curtidas';
import DadosUsuariosFlat from '@/components/dadosUsuariosFlat';
import DadosUsuariosMap from '@/components/dadosUsuariosMap';

export default function Index() {
  return (
    <View style={styles.container}>
      <DadosUsuariosMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#fff',
  },

  button: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
});
