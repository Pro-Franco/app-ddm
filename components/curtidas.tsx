import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const Curtidas = () => {
  const [curtidas, setCurtidas] = useState(0);

  const adicionarCurtida = () => {
    setCurtidas(curtidas + 1);
  };
  const Descurtir = () => {
    setCurtidas(curtidas - 1);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.texto}>Curtidas: {curtidas}</Text>
        <View
          style={{
            margin: 10,
            marginBottom: 10,
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <View>
            <Button title="Curtir" onPress={adicionarCurtida} />
          </View>
          <View>
            <Button title="Descurtir" onPress={Descurtir} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    margin: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  texto: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Curtidas;
