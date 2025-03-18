import { Text, View, StyleSheet, Image, Alert, Button } from 'react-native';
import { Link } from 'expo-router';
import { Welcome } from '@/components/welcome';
import { Button as B1 } from 'react-native-paper';
import PlacarFutebol from '@/components/placarFutebol';

export default function ImageButton() {
  function handleClick() {
    console.log('Clicou');

    return;
  }
  function handleclick2() {
    console.log('Clicou 2');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Trabalhando com imagens{' '}
        <Text style={{ color: 'red', fontSize: 30, fontWeight: 'bold' }}>
          react-native
        </Text>
      </Text>
      <Welcome name="Mel" age={20} />
      <View style={{ alignContent: 'center', alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100, margin: 10 }}
          source={require('../assets/images/splash-icon.png')}
          resizeMode="center"
        />
      </View>
      <Image
        style={styles.image}
        source={{ uri: 'https://picsum.photos/seed/696/3000/2000' }}
      />
      <View style={styles.button}>
        <Button title="clique aqui" onPress={handleClick} />
        <Button title="botao 2" onPress={() => console.log('Clicou')} />
      </View>
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

  welcome: {
    marginTop: 20,
  },

  image: {
    backgroundColor: '#0553',
    height: 300, //"100%"
    width: 500,
    margin: 10,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
});
